import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { GeoField } from '@/database/entities/base/geo-field';
import { FlatLocation, FlatStats } from '@/database/entities/flat';
import { SubjectData } from '@/database/entities/subject-data';

// Create a Rent class to define the schema fields
@Schema({ strict: false, validateBeforeSave: false })
export class Rent extends Document implements SubjectData {
  @Prop({ type: Number, index: true, unique: true })
  adNumber: number;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  addressTitle: string;

  @Prop({ type: String })
  commentsType: string;

  @Prop({ type: Boolean })
  isCommentable: boolean;

  @Prop({ type: Boolean })
  isCommentableByEveryone: boolean;

  @Prop({ type: Boolean })
  isEstateVerified: boolean;

  @Prop({ type: Boolean })
  hasRelatedCompilation: boolean;

  @Prop({ type: Boolean })
  hasPrice: boolean;

  @Prop({ type: Boolean })
  isOnMap: boolean;

  @Prop({ type: Boolean })
  hasPackages: boolean;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: MongooseSchema.Types.Mixed })
  photos: any;

  @Prop({ type: MongooseSchema.Types.Mixed })
  map: FlatLocation;

  @Prop({ type: MongooseSchema.Types.Mixed })
  address: any;

  @Prop({ type: String })
  fullAddress: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  details: any;

  @Prop({ type: String })
  userType: string;

  @Prop({ type: String })
  ownerName: string;

  @Prop({ type: String })
  status: string;

  @Prop({ type: String })
  sectionAlias: string;

  @Prop({ type: Number })
  square: number;

  @Prop({ type: Number })
  roomCount: number;

  @Prop({ type: Number })
  categoryId: number;

  @Prop({ type: String })
  categoryAlias: string;

  @Prop({ type: Date })
  addedAt: Date;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: String })
  city: string;

  @Prop({ type: String })
  district: string;

  @Prop({ type: String })
  regionAlias: string;

  @Prop({ type: Date })
  placementDate: Date;

  @Prop({ type: String })
  publishedBy: string;

  @Prop({ type: String })
  houseType: string;

  @Prop({ type: String })
  residentialComplex: string;

  @Prop({ type: String })
  residentialComplexClass: string;

  @Prop({ type: String })
  residentialComplexCompany: string;

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

  @Prop({ type: MongooseSchema.Types.Mixed })
  statistics: FlatStats;

  @Prop({ type: GeoField })
  location: GeoField;
}

// Create the schema factory for Rent
const RentSchema = SchemaFactory.createForClass(Rent);

export { RentSchema };
