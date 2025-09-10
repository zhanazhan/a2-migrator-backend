import { Document } from 'mongoose';

export interface SubjectData extends Document {
  regionAlias: string;
  fullAddress: string;
  title: string;
  roomCount: number;
  floor: number;
  totalFloors: number;
  area: number;
  cost: number;
  constructionYear: number;
  city: string;
  residentialComplex: string;
  residentialComplexClass: string;
  residentialComplexCompany: string;
  scrapedAt: Date;
}
