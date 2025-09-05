import { Injectable, Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { Complex } from '@/database/entities/complex';
import { ComplexDbService } from '@/database/services/complex-db.service';
import { cleanText } from '@/libs/strings';
import { ComplexMatchingDto } from '@/modules/complex/dtos/complex-matching.dto';
import { ComplexDto } from '@/modules/complex/dtos/complexes-data.dto';

const REMOVE_PARTS = ['жк'];

const DEFAULT_RESPONSE = (name: string): ComplexMatchingDto =>
  ({ name, sources: [] }) as ComplexMatchingDto;

@Injectable()
export class ComplexesService {
  private readonly logger = new Logger(ComplexesService.name);

  constructor(private service: ComplexDbService) {}

  private getFixedName(complexName: string) {
    const lowerCase = complexName.toLowerCase();

    return lowerCase
      .split(' ')
      .filter((c) => !REMOVE_PARTS.includes(c))
      .join(' ')
      .trim();
  }

  async findComplexes(
    complexes: string[],
    complexClass: string,
  ): Promise<ComplexDto[]> {
    return await this.service.db
      .find({
        name: { $in: complexes },
        'parameters.value': complexClass,
      })
      .exec();
  }

  async find(
    complexName: string,
    cityEnglish: string,
  ): Promise<ComplexMatchingDto> {
    if (!complexName || complexName.length === 0) {
      this.logger.error('No complex provided');
      return DEFAULT_RESPONSE('');
    }

    let candidates = await this.service.db
      .find({
        name: complexName,
        regionAlias: cityEnglish,
      })
      .exec();

    if (candidates.length === 1) {
      return this.enrichComplex(complexName, candidates[0], true);
    }

    return null;
  }

  private enrichComplex(
    name: string,
    complex: Complex | null,
    exactMatch: boolean,
  ): ComplexMatchingDto {
    const source = plainToInstance(ComplexDto, complex, {
      excludeExtraneousValues: true,
    });

    const improved = {
      ...source,
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

    return {
      name: cleanText(name),
      exactMatch,
      sources: [improved],
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
}
