import { Module } from '@nestjs/common';

import { DBModule } from '@/database/db.module';
import { ComplexesModule } from '@/modules/complex/complexes.module';

import { RentsService } from './services/rents.service';

@Module({
  controllers: [],
  imports: [ComplexesModule, DBModule],
  providers: [RentsService],
  exports: [RentsService],
})
export class RentsModule {}
