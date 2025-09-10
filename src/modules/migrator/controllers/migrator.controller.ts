import { Controller, Get, Query } from '@nestjs/common';

import { FlatsEnricherService } from '@/modules/migrator/services/flats-enricher.service';
import { FlatsMigratorService } from '@/modules/migrator/services/flats-migrator.service';

@Controller({ path: 'migrate', version: '1' })
export class MigratorController {
  constructor(
    private readonly flatsMigratorService: FlatsMigratorService,
    private readonly flatsEnricherService: FlatsEnricherService,
  ) {}

  @Get('flats')
  migrateFlats(@Query('batchSize') batchSize?: string) {
    const size = batchSize ? parseInt(batchSize, 10) : 10000;
    this.flatsMigratorService
      .migrate(size)
      .then(() => console.log('Migration finished'))
      .catch((err) => console.error('Migration failed', err));

    return { message: 'Migration started' };
  }

  @Get('enrich/flats')
  enrichFlats(@Query('batchSize') batchSize?: string) {
    const size = batchSize ? parseInt(batchSize, 10) : 10000;
    this.flatsEnricherService
      .migrate(size)
      .then(() => console.log('Enrich flats finished'))
      .catch((err) => console.error('Enrich flats failed', err));

    return { message: 'Enrich flats started' };
  }

  @Get('enrich/rents')
  enrichRents(@Query('batchSize') batchSize?: string) {
    const size = batchSize ? parseInt(batchSize, 10) : 10000;
    this.flatsEnricherService
      .migrate(size)
      .then(() => console.log('Enrich flats finished'))
      .catch((err) => console.error('Enrich flats failed', err));

    return { message: 'Enrich flats started' };
  }
}
