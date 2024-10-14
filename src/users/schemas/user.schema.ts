import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ default: false })
  isAdmin?: boolean;

  @Prop({ default: false })
  isVolonteer?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
