import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type GatheringDocument = Gathering & Document;

@Schema()
export class Gathering {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true})
  g_date: Date;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  currentSum: number;

  @Prop({type: Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId;
}

export const GatheringSchema = SchemaFactory.createForClass(Gathering);
