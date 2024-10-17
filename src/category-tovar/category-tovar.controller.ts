import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoryTovarService } from './category-tovar.service';
import { CategoryTovarDto } from './dto/category-tovar.dto';
import { CategoryTovar } from './interfaces/category-tovar.interface';

@Controller('categories-tovary')
export class CategoryTovarController {
  constructor(private readonly categoryService: CategoryTovarService) {}

  @Post()
  async create(@Body() CategoryDto: CategoryTovarDto): Promise<CategoryTovar> {
    return this.categoryService.create(CategoryDto);
  }

  @Get()
  async findAll(): Promise<CategoryTovar[]> {
    return this.categoryService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() CategoryDto: CategoryTovarDto,
  ): Promise<CategoryTovar> {
    return this.categoryService.update(id, CategoryDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.categoryService.delete(id);
  }
}
