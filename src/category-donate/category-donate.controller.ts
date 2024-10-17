import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoryDonateService } from './category-donate.service';
import { CategoryDonateDto } from './dto/category-donate.dto';
import { CategoryDonate } from './interfaces/category-donate.interface';

@Controller('categories')
export class CategoryDonateController {
  constructor(private readonly categoryService: CategoryDonateService) {}

  @Post()
  async create(@Body() CategoryDto: CategoryDonateDto): Promise<CategoryDonate> {
    return this.categoryService.create(CategoryDto);
  }

  @Get()
  async findAll(): Promise<CategoryDonate[]> {
    return this.categoryService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() CategoryDto: CategoryDonateDto,
  ): Promise<CategoryDonate> {
    return this.categoryService.update(id, CategoryDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.categoryService.delete(id);
  }
}
