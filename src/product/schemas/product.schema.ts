import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: Number, required: true },
  categorytovar: { type: Schema.Types.ObjectId, ref: 'CategoryTovar', required: true },
  distributor: { type: Schema.Types.ObjectId, ref: 'Distributor', required: true },
});
