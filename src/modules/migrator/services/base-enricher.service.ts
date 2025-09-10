import { Logger } from '@nestjs/common';

import { BaseReporterService } from '@/core/services/base-reporter.service';
import { MongooseService } from '@/database/db.service';
import { SubjectData } from '@/database/entities';
import { ComplexesService } from '@/modules/complex/services/complexes.service';
import { TelegramService } from '@/modules/monitoring/services/telegram.service';
import { RegionsService } from '@/modules/regions/services/regions.service';

export class BaseEnricherService<
  T extends SubjectData,
  S extends MongooseService<T>,
> extends BaseReporterService {
  constructor(
    protected context: string,
    protected logger: Logger,
    protected complexesService: ComplexesService,
    protected dbService: S,
    protected regionsService: RegionsService,
    protected telegramService: TelegramService,
  ) {
    super(context, logger, telegramService);
  }

  async migrate(batchSize: number = 10000) {
    // Get total documents count first
    const totalDocs = await this.dbService.model.countDocuments();

    this.log(`Enrich flats init. Total: ${totalDocs} documents`);
    let processed = 0;

    const cursor = this.dbService.model.find().cursor();
    let batch: T[] = [];

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

  private async updateFlats(batch: T[]) {
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
        const result = await this.dbService.model.bulkWrite(bulkOps, {
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

  private async enrichFlats(batch: T[]) {
    for (const item of batch) {
      const regionAlias = await this.regionsService.find(item.city);

      if (!regionAlias) {
        this.logger.debug(`Region not found: ${item.city}`);
      } else {
        item.regionAlias = regionAlias;
      }

      const complex = await this.complexesService.find(
        item.residentialComplex,
        regionAlias,
      );

      if (!complex) {
        this.logger.debug(
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
