import { Document } from 'mongoose';
import { CategoryTovar } from '../../category-tovar/interfaces/category-tovar.interface';

export interface Product extends Document {
  id?: string;
  name: string;
  img: string;
  price: number;
  categorytovar: CategoryTovar | string;
}
