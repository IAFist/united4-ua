import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductSchema } from './schemas/product.schema';
import { CategoryTovarModule } from '../category-tovar/category-tovar.module';
import { DistributorModule } from 'src/distributor/distributor.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    CategoryTovarModule,
    DistributorModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
