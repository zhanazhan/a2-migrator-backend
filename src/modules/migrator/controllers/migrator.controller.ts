import { Controller, Get } from '@nestjs/common';
import { MigratorService } from '@/modules/migrator/services/migrator.service';

@Controller({ path: 'flats', version: '1' })
export class MigratorController {
  constructor(private readonly service: MigratorService) {}

  @Get('migrate')
  async migrateFlats() {
    return this.service.migrateFlats();
  }
}
