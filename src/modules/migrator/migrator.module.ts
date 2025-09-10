import { Module } from '@nestjs/common';

import { DBModule } from '@/database/db.module';
import { ComplexesModule } from '@/modules/complex/complexes.module';
import { FlatsModule } from '@/modules/flats/flats.module';
import { FlatsEnricherService } from '@/modules/migrator/services/flats-enricher.service';
import { RentsEnricherService } from '@/modules/migrator/services/rents-enricher.service';
import { MonitoringModule } from '@/modules/monitoring/monitoring.module';
import { RegionsModule } from '@/modules/regions/regions.module';

import { MigratorController } from './controllers/migrator.controller';
import { FlatsMigratorService } from './services/flats-migrator.service';

@Module({
  controllers: [MigratorController],
  imports: [
    DBModule,
    ComplexesModule,
    FlatsModule,
    MonitoringModule,
    RegionsModule,
  ],
  providers: [FlatsMigratorService, FlatsEnricherService, RentsEnricherService],
  exports: [FlatsMigratorService, FlatsEnricherService, RentsEnricherService],
})
export class MigratorModule {}
