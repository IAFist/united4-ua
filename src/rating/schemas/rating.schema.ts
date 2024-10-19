import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RatingDocument = Rating & Document;

@Schema()
export class Rating {
  @Prop({ required: true })
  value: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Gathering', required: true })
  gatheringId: Types.ObjectId;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
