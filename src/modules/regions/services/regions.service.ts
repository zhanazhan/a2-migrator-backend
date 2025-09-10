import { Injectable, Logger } from '@nestjs/common';

import { RegionDbService } from '@/database/services/region-db.service';

@Injectable()
export class RegionsService {
  private readonly logger = new Logger(RegionsService.name);
  private cache: Record<string, string> = {};

  constructor(private service: RegionDbService) {}

  async prepareCache(): Promise<void> {
    if (Object.keys(this.cache).length > 0) {
      this.logger.warn('cache ready');
      return;
    }
    try {
      const cursor = this.service.model.find().cursor();

      for await (const item of cursor) {
        for (const child of item.result) {
          // this.logger.debug(`cache building: ${child.name}`);

          this.cache[child.alias] = item.parent.alias;
        }
      }
      this.logger.warn('cache built');
    } catch (e) {
      this.logger.error(`cache failed: ${e}`);
    }
  }

  async find(name: string) {
    if (!name || name.trim().length === 0) {
      this.logger.warn('name not supplied');
      return null;
    }

    await this.prepareCache();

    return this.cache[name];
  }

  async getCache() {
    await this.prepareCache();
    return this.cache;
  }
}
