import { SubjectData } from '@/database/entities';

export type HousingClass = 'n/a' | 'эконом' | 'комфорт' | 'бизнес' | 'элит';

export const parseCeiling = (value: string): number => {
  if (!value) return NaN;
  const cleaned = value
    .replace(/[a-zA-Zа-яА-Я]+/g, '')
    .replace(/\s+/g, '')
    .replace(',', '.');
  return parseFloat(cleaned);
};

export const splitSafe = (value: string, separator = ','): string[] => {
  if (!value) return [];
  try {
    return value.split(separator).map((e) => e.trim());
  } catch {
    return [];
  }
};

export interface Apartment {
  area: number;
  ceilings: string;
  cost: number;
  security?: string;
  condition?: string;
  description?: string;
  constructionYear?: number;
  statistics?: {
    currentFlat?: number;
    similarFlatsArea?: number;
  };
}

export const gradeApartment = (apartment: SubjectData): HousingClass => {
  try {
    const {
      area,
      ceilings,
      cost,
      security,
      condition,
      description,
      constructionYear = 0,
      statistics,
    } = apartment;

    const {
      currentFlat: pricePerM2 = cost / area,
      similarFlatsArea: avgPricePerM2 = 0,
    } = statistics ?? {};

    const ceiling = parseCeiling(ceilings);
    const amenities = splitSafe(security);

    const has = (name: string) =>
      amenities.some((a) => a.toLowerCase().includes(name));

    const lcCondition = (condition ?? '').toLowerCase();
    const rawCondition =
      lcCondition === '' ||
      lcCondition.includes('чернов') ||
      lcCondition.includes('свободная планировка');

    let cls: HousingClass = 'комфорт'; // default

    if (
      area < 35 ||
      ceiling < 2.5 ||
      (rawCondition && amenities.length === 0)
    ) {
      cls = 'эконом';
    } else if (
      area >= 35 &&
      area <= 90 &&
      ceiling >= 2.7 &&
      ceiling < 3.0 &&
      !rawCondition
    ) {
      cls = 'комфорт';
    } else if (
      area >= 60 &&
      area <= 150 &&
      ceiling >= 3.0 &&
      ceiling < 3.3 &&
      !rawCondition
    ) {
      const premium = [
        'охрана',
        'видеонаблюдение',
        'подземный',
        'двор',
        'решетки на окнах',
        'консьерж',
        'кодовый замок',
        'видеодомофон',
        'сигнализация',
      ];
      const premiumCount = premium.filter((p) => has(p)).length;
      cls = premiumCount >= 4 ? 'бизнес' : 'комфорт';
    } else if (
      area >= 120 &&
      ceiling >= 3.3 &&
      description?.toLowerCase().includes('дизайн')
    ) {
      cls = 'элит';
    } else if (constructionYear > 2015) {
      cls = 'комфорт';
    }

    // учтем цену за квартиру
    if (pricePerM2 > 0 && avgPricePerM2 > 0) {
      const diff = (pricePerM2 - avgPricePerM2) / avgPricePerM2;
      const order: HousingClass[] = ['эконом', 'комфорт', 'бизнес', 'элит'];
      let idx = order.indexOf(cls);

      if (diff > 0.35 && idx < order.length - 1) idx++;
      if (diff < -0.25 && idx > 0) idx--;

      cls = order[idx];
    }

    return cls;
  } catch {
    return 'n/a';
  }
};
