import { Logger } from '@nestjs/common';

import { TelegramService } from '@/modules/monitoring/services/telegram.service';

export abstract class BaseReporterService {
  protected readonly logger: Logger;
  protected readonly context: string;

  protected constructor(
    context: string,
    logger: Logger,
    protected telegramService: TelegramService,
  ) {
    this.context = context;
    this.logger = logger;
  }

  protected log(message: string) {
    this.logger.log(message);
    this.telegramService.sendMessage(message, this.context).then();
  }
}
