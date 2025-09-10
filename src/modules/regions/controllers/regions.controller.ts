import { Controller, Get, Logger, Query } from '@nestjs/common';

import { RegionsService } from '@/modules/regions/services/regions.service';

@Controller({ path: 'regions', version: '1' })
export class RegionsController {
  private readonly logger = new Logger(RegionsController.name);
  constructor(private readonly service: RegionsService) {}

  @Get()
  async find(@Query('name') name: string) {
    this.logger.debug(`requested: ${name}`);
    return this.service.find(name);
  }

  @Get('cache')
  async getCache() {
    this.logger.debug(`requested cache`);
    return this.service.getCache();
  }
}
