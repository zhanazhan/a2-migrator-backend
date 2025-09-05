import { Module } from '@nestjs/common';

import { DBModule } from '@/database/db.module';

import { ComplexesController } from './controllers/complexes.controller';
import { ComplexesService } from './services/complexes.service';

@Module({
  controllers: [ComplexesController],
  imports: [DBModule],
  providers: [ComplexesService],
  exports: [ComplexesService],
})
export class ComplexesModule {}
