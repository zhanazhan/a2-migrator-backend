import { Controller, Get, Query } from '@nestjs/common';
import { MigratorService } from '@/modules/migrator/services/migrator.service';

@Controller({ path: 'flats', version: '1' })
export class MigratorController {
  constructor(private readonly service: MigratorService) {}

  @Get('migrate')
  async migrateFlats(@Query('batchSize') batchSize?: string) {
    const size = batchSize ? parseInt(batchSize, 10) : 10000;
    this.service
      .migrateFlats(size)
      .then(() => console.log('Migration finished'))
      .catch((err) => console.error('Migration failed', err));

    return { message: 'Migration started' };
  }
}
