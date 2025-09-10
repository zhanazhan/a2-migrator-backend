import { Injectable, Logger } from '@nestjs/common';

import { BaseReporterService } from '@/core/services/base-reporter.service';
import { Flat } from '@/database/entities';
import { ComplexesService } from '@/modules/complex/services/complexes.service';
import { FlatsService } from '@/modules/flats/services/flats.service';
import { TelegramService } from '@/modules/monitoring/services/telegram.service';
import { RegionsService } from '@/modules/regions/services/regions.service';

@Injectable()
export class FlatsEnricherService extends BaseReporterService {
  constructor(
    private complexesService: ComplexesService,
    private dbService: FlatsService,
    private regionsService: RegionsService,
    protected telegramService: TelegramService,
  ) {
    super('flats', new Logger(FlatsEnricherService.name), telegramService);
  }

  async migrate(batchSize: number = 10000) {
    // Get total documents count first
    const totalDocs = await this.dbService.db.countDocuments();

    this.log(`Enrich flats init. Total: ${totalDocs} documents`);
    let processed = 0;

    const cursor = this.dbService.db.find().cursor();
    let batch: Flat[] = [];

    for await (const doc of cursor) {
      batch.push(doc);

      if (batch.length >= batchSize) {
        await this.updateFlats(batch);
        processed += batch.length;

        const percent = ((processed / totalDocs) * 100).toFixed(2);
        this.log(
          `Enrich flats ${processed}/${totalDocs} documents (${percent}%)`,
        );

        batch = [];
      }
    }

    if (batch.length > 0) {
      await this.updateFlats(batch);
      processed += batch.length;

      const percent = ((processed / totalDocs) * 100).toFixed(2);
      this.log(
        `Enrich flats ${processed}/${totalDocs} documents (${percent}%)`,
      );
    }

    this.log(`✅ Enrich flats complete. Total: ${processed} documents`);
  }

  private async updateFlats(batch: Flat[]) {
    try {
      const enrichedFlats = await this.enrichFlats(batch);
      const bulkOps = enrichedFlats.map((item) => ({
        updateOne: {
          filter: { _id: item._id }, // make sure this is ObjectId
          update: {
            $set: {
              regionAlias: item.regionAlias,
              fullAddress: item.fullAddress,
              residentialComplexClass: item.residentialComplexClass,
              constructionYear: item.constructionYear,
              totalFloors: item.totalFloors,
              residentialComplexCompany: item.residentialComplexCompany,
            },
          },
        },
      }));

      if (bulkOps.length > 0) {
        const result = await this.dbService.db.bulkWrite(bulkOps, {
          ordered: false,
        });

        this.logger.debug(
          `bulkWrite result: matched ${result.matchedCount}, modified ${result.modifiedCount}`,
        );
      }
    } catch (err) {
      this.logger.error(`BulkWrite failed: ${err.message}`, err.stack);
      throw err;
    }
  }

  private async enrichFlats(batch: Flat[]) {
    for (const item of batch) {
      const regionAlias = await this.regionsService.find(item.city);

      if (!regionAlias) {
        this.logger.warn(`Region not found: ${item.city}`);
      } else {
        item.regionAlias = regionAlias;
      }

      const complex = await this.complexesService.find(
        item.residentialComplex,
        regionAlias,
      );

      if (!complex) {
        this.logger.warn(
          `Complex not found: ${item.residentialComplex}, region: ${regionAlias}`,
        );
        continue; // or set defaults
      }

      item.fullAddress = complex.address;
      item.residentialComplexClass = complex.class;
      item.constructionYear = item.constructionYear ?? complex.year;
      item.totalFloors = item.totalFloors ?? complex.totalFloors;
      item.residentialComplexCompany = complex.company;
    }
    return batch;
  }
}
