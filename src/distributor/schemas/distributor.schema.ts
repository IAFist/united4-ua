import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DistributorDocument = Distributor & Document;

@Schema()
export class Distributor {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  edrpou: string;

  @Prop({ required: true})
  photoUrl: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const DistributorSchema = SchemaFactory.createForClass(Distributor);
