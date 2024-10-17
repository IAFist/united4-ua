import { Schema } from 'mongoose';

export const CategoryDonateSchema = new Schema({
  name: { type: String, required: true, unique: true },
});
