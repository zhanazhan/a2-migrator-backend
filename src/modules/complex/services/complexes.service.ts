import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { Complex } from '@/database/entities';
import { ComplexDbService } from '@/database/services/complex-db.service';
import { cleanText } from '@/libs/strings';
import { ComplexDto } from '@/modules/complex/dtos/complexes-data.dto';

@Injectable()
export class ComplexesService {
  private readonly logger = new Logger(ComplexesService.name);
  private cache: Record<string, ComplexDto> = {};

  constructor(private service: ComplexDbService) {}

  private enrichComplex(complex: Complex | null): ComplexDto {
    const source = plainToInstance(ComplexDto, complex, {
      excludeExtraneousValues: true,
    });

    return {
      ...source,
      name: cleanText(source.name),
      address: cleanText(source.address),
      class: cleanText(
        this.getValueFromTheArray(
          complex.parameters as any[],
          { searchField: 'title', returnValue: 'value' },
          'Класс жилья',
          (value) => value,
        ),
      ),
      company: cleanText(
        this.getValueFromTheArray(
          complex.sidebarInfo as any[],
          { searchField: 'title', returnValue: 'text' },
          'Застройщик',
          (value) => value,
        ),
      ),
      year: this.getValueFromTheArray(
        complex.sidebarInfo as any[],
        { searchField: 'title', returnValue: 'text' },
        'Срок сдачи',
        (value): number => {
          try {
            const match = value.match(/\b(\d{4})\b/);
            return match ? parseInt(match[1], 10) : null;
          } catch {
            return null;
          }
        },
      ),
      totalFloors: this.getValueFromTheArray<number>(
        complex.parameters as any[],
        { searchField: 'title', returnValue: 'value' },
        'Этажность',
        (value) => {
          try {
            const match = value.match(/\d+/);
            return match ? parseInt(match[0], 10) : null;
          } catch {
            return null;
          }
        },
      ),
    };
  }

  private getValueFromTheArray<T>(
    items: any[],
    opts: {
      returnValue: string;
      searchField: string;
    },
    searchValue: string,
    formatter: (value: string) => T | null,
  ): T | null {
    const { searchField, returnValue } = opts;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const found = items.find((item) => item[searchField] === searchValue);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
    return found && found[returnValue] ? formatter(found[returnValue]) : null;
  }

  private getKey(name: string, regionAlias: string) {
    return `${name}-${regionAlias ?? ''}`;
  }

  private async prepareCache(): Promise<void> {
    if (Object.keys(this.cache).length > 0) {
      // this.logger.warn('cache ready');
      return;
    }
    try {
      const cursor = this.service.model.find().cursor();

      for await (const item of cursor) {
        if (!item) {
          continue;
        }
        const { name, regionAlias } = item;
        if (!name) {
          continue;
        }
        const key = this.getKey(name, regionAlias);
        // this.logger.debug(`cache building: ${key}`);
        this.cache[key] = this.enrichComplex(item);
      }
      this.logger.warn('cache built');
    } catch (e) {
      this.logger.error(`cache failed: ${e}`);
    }
  }

  async find(name: string, regionAlias: string): Promise<ComplexDto | null> {
    if (!name || name.trim().length === 0) {
      return null;
    }

    await this.prepareCache();

    try {
      return regionAlias
        ? this.cache[this.getKey(name, regionAlias)]
        : await this.findOne(name);
    } catch (e) {
      this.logger.error(e);
      return null;
    }
  }

  async getCache() {
    await this.prepareCache();
    return this.cache;
  }

  private async findOne(name: string): Promise<ComplexDto> {
    const items = await this.service.model
      .find({
        name,
      })
      .exec();

    if (items.length === 1) {
      return this.enrichComplex(items[0]);
    } else {
      return null;
    }
  }
}
