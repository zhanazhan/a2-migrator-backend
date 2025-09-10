import { Injectable, Logger } from '@nestjs/common';

import { BaseReporterService } from '@/core/services/base-reporter.service';
import { Flat } from '@/database/entities';
import { PostgresFlatsService } from '@/database/services/flats-posgresql.service';
import { ComplexesService } from '@/modules/complex/services/complexes.service';
import { FlatsService } from '@/modules/flats/services/flats.service';
import { TelegramService } from '@/modules/monitoring/services/telegram.service';

@Injectable()
export class FlatsMigratorService extends BaseReporterService {
  constructor(
    private complexesService: ComplexesService,
    private dbService: FlatsService,
    private postgresFlatsService: PostgresFlatsService,
    protected telegramService: TelegramService,
  ) {
    super('pg-flats', new Logger(FlatsMigratorService.name), telegramService);
  }

  async migrate(batchSize: number = 10000) {
    await this.postgresFlatsService.deleteAll();
    // Get total documents count first
    const totalDocs = await this.dbService.db.countDocuments();

    this.log(`Migration init. Total: ${totalDocs} documents`);
    let processed = 0;

    const cursor = this.dbService.db.find().cursor();
    let batch: Flat[] = [];

    for await (const doc of cursor) {
      batch.push(doc);

      if (batch.length >= batchSize) {
        await this.insertBatchToPostgres(batch);
        processed += batch.length;

        const percent = ((processed / totalDocs) * 100).toFixed(2);
        this.log(`Migrated ${processed}/${totalDocs} documents (${percent}%)`);

        batch = [];
      }
    }

    if (batch.length > 0) {
      await this.insertBatchToPostgres(batch);
      processed += batch.length;

      const percent = ((processed / totalDocs) * 100).toFixed(2);
      this.log(`Migrated ${processed}/${totalDocs} documents (${percent}%)`);
    }

    this.log(`✅ Migration complete. Total: ${processed} documents`);
  }

  private async insertBatchToPostgres(batch: Flat[]) {
    try {
      // Insert data into PostgreSQL
      await this.postgresFlatsService.bulkInsert(batch);
    } catch (err) {
      this.logger.error(`Insert batch failed: ${err.message}`, err.stack);
      throw err;
    }
  }
}
