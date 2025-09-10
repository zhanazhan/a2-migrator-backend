import { Module } from '@nestjs/common';

import { DBModule } from '@/database/db.module';

import { RegionsController } from '@/modules/regions/controllers/regions.controller';
import { RegionsService } from './services/regions.service';

@Module({
  controllers: [RegionsController],
  imports: [DBModule],
  providers: [RegionsService],
  exports: [RegionsService],
})
export class RegionsModule {}
