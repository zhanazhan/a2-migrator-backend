import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

// --- Types ---
export class RegionChildrenParent {
  id: number;
  alias: string;
  name: string;
  lat: number;
  lon: number;
  zoom: number;
  type: string;
  hasComplexes: boolean;
  isSelectable: boolean;
}

export class RegionChildrenResult {
  id: number;
  alias: string;
  name: string;
  lat: number;
  lon: number;
  zoom: number;
  type: string;
  hasComplexes: boolean;
  label: string;
  selected: boolean;
  hasChildren: boolean;
  hasStreet?: boolean;
  isBigCity?: boolean;
  parentId?: number;
  level?: number;
}

export interface RegionChildrenResponse {
  result: RegionChildrenResult[];
  regionCount: number;
  parent?: RegionChildrenParent;
}

// --- NestJS Mongoose schema ---
@Schema({ timestamps: true, collection: 'regionchildrens' })
export class Region extends Document implements RegionChildrenResponse {
  @Prop({ type: [MongooseSchema.Types.Mixed], required: false })
  result: RegionChildrenResult[];

  @Prop({ type: Number, required: true })
  regionCount: number;

  @Prop({ type: MongooseSchema.Types.Mixed, required: false })
  parent?: RegionChildrenParent;
}

export const RegionSchema =
  SchemaFactory.createForClass(Region);
