import { Document } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

export class AuditDocument extends Document {
  @Prop() createdAt: Date;
  @Prop() updatedAt: Date;

  @Prop()
  createdBy?: string;

  @Prop()
  updatedBy?: string;
}
