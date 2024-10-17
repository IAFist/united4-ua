import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryTovar } from './interfaces/category-tovar.interface';
import { CategoryTovarDto } from './dto/category-tovar.dto';

@Injectable()
export class CategoryTovarService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<CategoryTovar>,
  ) {}

  async create(CategoryDto: CategoryTovarDto): Promise<CategoryTovar> {
    const newCategory = new this.categoryModel(CategoryDto);
    return newCategory.save();
  }

  async findAll(): Promise<CategoryTovar[]> {
    return this.categoryModel.find().exec();
  }

  async update(id: string, CategoryDto: CategoryTovarDto): Promise<CategoryTovar> {
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
