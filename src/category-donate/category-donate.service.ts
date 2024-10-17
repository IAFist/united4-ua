import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDonate } from './interfaces/category-donate.interface';
import { CategoryDonateDto } from './dto/category-donate.dto';

@Injectable()
export class CategoryDonateService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<CategoryDonate>,
  ) {}

  async create(CategoryDto: CategoryDonateDto): Promise<CategoryDonate> {
    const newCategory = new this.categoryModel(CategoryDto);
    return newCategory.save();
  }

  async findAll(): Promise<CategoryDonate[]> {
    return this.categoryModel.find().exec();
  }

  async update(id: string, CategoryDto: CategoryDonateDto): Promise<CategoryDonate> {
    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(id, CategoryDto, { new: true })
      .exec();
    if (!updatedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return updatedCategory;
  }

  async delete(id: string): Promise<void> {
    const result = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }
}
