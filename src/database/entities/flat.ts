import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { GeoField } from '@/database/entities/base/geo-field';
import { SubjectData } from '@/database/entities/subject-data';

export class FlatLocation {
  lat: number;
  lon: number;
}

@Schema({ strict: false, validateBeforeSave: false })
export class FlatStats {
  @Prop({ type: Number })
  currentFlat?: number;
  @Prop({ type: Number })
  similarFlatsArea?: number;
  @Prop({ type: Number })
  similarFlatsCity?: number;
  @Prop({ type: Number })
  similarFlatsAreaDifference?: number;
}

const FlatStatsMongooseSchema = SchemaFactory.createForClass(FlatStats);

@Schema({ strict: false, validateBeforeSave: false })
export class Flat extends Document implements SubjectData {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  fullAddress: string;

  @Prop({ type: Date })
  placementDate: Date;

  @Prop({ type: String })
  publishedBy: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  map: FlatLocation;

  @Prop({ type: MongooseSchema.Types.Mixed })
  category: any;

  @Prop({ type: Number })
  roomCount: number;

  @Prop({ type: Number })
  daysInLive: number;

  @Prop({ type: Date })
  addedAt: Date;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Number })
  adNumber: number;

  @Prop({ type: String })
  city: string;

  @Prop({ type: String })
  district: string;

  @Prop({ type: String })
  houseType: string;

  @Prop({ type: String })
  residentialComplex: string;

  @Prop({ type: Number })
  residentialComplexId: number;

  @Prop({ type: Number })
  constructionYear: number;

  @Prop({ type: Number })
  floor: number;

  @Prop({ type: Number })
  totalFloors: number;

  @Prop({ type: Number })
  area: number;

  @Prop({ type: String })
  condition: string;

  @Prop({ type: Number })
  cost: number;

  @Prop({ type: Number })
  bathroomCount: number;

  @Prop({ type: Boolean })
  balcony: boolean;

  @Prop({ type: Boolean })
  parking: boolean;

  @Prop({ type: Boolean })
  furnished: boolean;

  @Prop({ type: String })
  floorCovering: string;

  @Prop({ type: String })
  ceilings: string;

  @Prop({ type: String })
  security: string;

  @Prop({ type: Boolean })
  formerDormitory: boolean;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Date })
  scrapedAt: Date;

  @Prop({ type: FlatStatsMongooseSchema })
  statistics: FlatStats; // Adjust the type as per the FlatStats schema

  @Prop({ type: GeoField })
  location: GeoField;
}

// Create the schema factory
const FlatSchema = SchemaFactory.createForClass(Flat);

export { FlatSchema };
