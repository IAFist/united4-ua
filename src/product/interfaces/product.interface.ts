import { Document } from 'mongoose';
import { CategoryTovar } from '../../category-tovar/interfaces/category-tovar.interface';
import { DistributorDocument } from 'src/distributor/schemas/distributor.schema';

export interface Product extends Document {
  id?: string;
  name: string;
  img: string;
  price: number;
  distributor: DistributorDocument | string;
  categorytovar: CategoryTovar | string;
}
