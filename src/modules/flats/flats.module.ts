import { Module } from '@nestjs/common';

import { DBModule } from '@/database/db.module';
import { FlatsService } from './services/flats.service';

@Module({
  controllers: [],
  imports: [DBModule],
  providers: [FlatsService],
  exports: [FlatsService],
})
export class FlatsModule {}
