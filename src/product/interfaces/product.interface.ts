import { Document } from 'mongoose';
import { Category } from '../../category/interfaces/category.interface';

export interface Product extends Document {
  id?: string;
  name: string;
  img: string;
  price: number;
  category: Category | string;
}
