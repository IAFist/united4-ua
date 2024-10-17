import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductSchema } from './schemas/product.schema';
import { CategoryTovarModule } from '../category-tovar/category-tovar.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    CategoryTovarModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
