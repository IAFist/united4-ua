import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VolonteerDocument = Volonteer & Document;

@Schema()
export class Volonteer {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const VolonteerSchema = SchemaFactory.createForClass(Volonteer);
