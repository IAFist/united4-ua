import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
  @Prop({ required: true })
  card_account: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
