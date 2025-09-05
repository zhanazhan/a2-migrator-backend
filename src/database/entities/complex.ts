import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, collection: 'complexes' })
export class Complex extends Document {
  @Prop({ required: true }) complexId: number;
  @Prop() urlAlias?: string;
  @Prop() isOnMap?: boolean;
  @Prop({ type: MongooseSchema.Types.Mixed }) photos?: any;
  @Prop() isPublished?: boolean;
  @Prop() name?: string;
  @Prop() prefix?: string;
  @Prop() layoutPrefix?: string;
  @Prop() secondaryPrefix?: string;
  @Prop() notPartnerPrefix?: string;
  @Prop() address?: string;
  @Prop() region?: string;
  @Prop() leadFormVisibility?: boolean;
  @Prop() regionAlias?: string;
  @Prop() similarSearchUrl?: string;
  @Prop() secondaryVisibility?: boolean;
  @Prop() previewPhoto?: string;
  @Prop() priceSquareFrom?: number;
  @Prop() priceSquareTo?: number;
  @Prop() priceFrom?: number;
  @Prop() stateText?: string;
  @Prop({ type: MongooseSchema.Types.Mixed }) workTime?: any;
  @Prop({ type: MongooseSchema.Types.Mixed }) priceSquareHistory?: any;
  @Prop() isPriceSquareVisible?: boolean;
  @Prop({ type: MongooseSchema.Types.Mixed }) constructionProgress?: any;
  @Prop() isSalesCompleted?: boolean;
  @Prop() country?: string;
  @Prop() freeFormVisibility?: boolean;
  @Prop() freeCallVisibility?: boolean;
  @Prop({ type: MongooseSchema.Types.Mixed }) map?: any;
  @Prop({ type: MongooseSchema.Types.Mixed }) secondary?: any;
  @Prop() nbTotal?: number;
  @Prop() link?: string;
  @Prop({ type: MongooseSchema.Types.Mixed }) layouts?: any;
  @Prop({ type: MongooseSchema.Types.Mixed }) layoutsPhotos?: any;
  @Prop({ type: MongooseSchema.Types.Mixed }) infrastructure?: any;
  @Prop({ type: MongooseSchema.Types.Mixed }) rating?: any;
  @Prop({ type: MongooseSchema.Types.Mixed }) parameters?: any;
  @Prop({ type: MongooseSchema.Types.Mixed }) sections?: any;
  @Prop({ type: MongooseSchema.Types.Mixed }) description?: any;
  @Prop({ type: MongooseSchema.Types.Mixed }) reliability?: any;
  @Prop({ type: MongooseSchema.Types.Mixed }) sidebarInfo?: any;
  @Prop({ required: true }) scrapedAt: Date;
}

const ComplexSchema = SchemaFactory.createForClass(Complex);

export { ComplexSchema };
