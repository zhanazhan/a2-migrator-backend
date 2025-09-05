import { Module } from '@nestjs/common';
import { ComplexesModule } from '@/modules/complex/complexes.module';

import { MigratorController } from './controllers/migrator.controller';
import { MigratorService } from './services/migrator.service';
import { FlatsModule } from '@/modules/flats/flats.module';
import { MonitoringModule } from '@/modules/monitoring/monitoring.module';
import {DBModule} from "@/database/db.module";

@Module({
  controllers: [MigratorController],
  imports: [DBModule, ComplexesModule, FlatsModule, MonitoringModule],
  providers: [MigratorService],
  exports: [MigratorService],
})
export class MigratorModule {}
