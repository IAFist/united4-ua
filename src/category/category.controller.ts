import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { Category } from './interfaces/category.interface';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() CategoryDto: CategoryDto): Promise<Category> {
    return this.categoryService.create(CategoryDto);
  }

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() CategoryDto: CategoryDto,
  ): Promise<Category> {
    return this.categoryService.update(id, CategoryDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.categoryService.delete(id);
  }
}
