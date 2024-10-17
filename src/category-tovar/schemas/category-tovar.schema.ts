import { Schema } from 'mongoose';

export const CategoryTovarSchema = new Schema({
  name: { type: String, required: true, unique: true },
});
