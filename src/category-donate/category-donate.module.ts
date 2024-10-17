import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryDonateService } from './category-donate.service';
import { CategoryDonateController } from './category-donate.controller';
import { CategoryDonateSchema } from './schemas/category-donate.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategoryDonateSchema }]),
  ],
  controllers: [CategoryDonateController],
  providers: [CategoryDonateService],
})
export class CategoryDonateModule {}
