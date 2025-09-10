import { Injectable, Logger } from '@nestjs/common';

import { Rent } from '@/database/entities';
import { RentDbService } from '@/database/services/rent-db.service';
import { ComplexesService } from '@/modules/complex/services/complexes.service';
import { BaseEnricherService } from '@/modules/migrator/services/base-enricher.service';
import { TelegramService } from '@/modules/monitoring/services/telegram.service';
import { RegionsService } from '@/modules/regions/services/regions.service';

@Injectable()
export class RentsEnricherService extends BaseEnricherService<
  Rent,
  RentDbService
> {
  constructor(
    protected complexesService: ComplexesService,
    protected dbService: RentDbService,
    protected regionsService: RegionsService,
    protected telegramService: TelegramService,
  ) {
    super(
      'rents',
      new Logger(RentsEnricherService.name),
      complexesService,
      dbService,
      regionsService,
      telegramService,
    );
  }
}
