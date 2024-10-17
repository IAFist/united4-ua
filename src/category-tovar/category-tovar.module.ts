import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryTovarService } from './category-tovar.service';
import { CategoryTovarController } from './category-tovar.controller';
import { CategoryTovarSchema } from './schemas/category-tovar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'CategoryTovar', schema: CategoryTovarSchema }]),
  ],
  controllers: [CategoryTovarController],
  providers: [CategoryTovarService],
})
export class CategoryTovarModule {}
