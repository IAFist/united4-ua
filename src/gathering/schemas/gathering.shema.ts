import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GatheringDocument = Gathering & Document;

@Schema()
export class Gathering {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  g_date_start: Date;

  @Prop({ required: true })
  g_date_finish: Date;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  card_account: string;

  @Prop({ required: true })
  currentSum: number;

  @Prop({ required: true })
  donaters: number;

  @Prop({ default: false })
  complete?: boolean;

  @Prop({ required: true })
  photo: string;

  @Prop({ required: true })
  countOfProduct: number;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId;

  @Prop({ default: 0 })
  rating?: number;
}

export const GatheringSchema = SchemaFactory.createForClass(Gathering);
