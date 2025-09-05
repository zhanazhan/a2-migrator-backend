import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';

import { AppConfig } from '@/config/app.config';
import { TelegramUtils } from '@/modules/monitoring/utils/telegram.utils';

@Injectable()
export class TelegramService {
  bot: Telegraf;
  channelId: string;
  enabled: boolean;

  constructor(protected configService: ConfigService<AppConfig>) {
    this.bot = new Telegraf(configService.get('TELEGRAM_TOKEN'));
    this.channelId = configService.get('TELEGRAM_CHANNEL_ID');
    this.enabled = configService.get('TELEGRAM_ENABLED');
  }

  async sendMessage(message: string, module: string = 'main'): Promise<void> {
    if (!this.enabled) {
      return;
    }
    const msg = `[${module}] ${message}`;
    await this.bot.telegram.sendMessage(
      this.channelId,
      TelegramUtils.escapeMarkdownMessage(msg),
      { parse_mode: 'MarkdownV2' },
    );
  }
}
