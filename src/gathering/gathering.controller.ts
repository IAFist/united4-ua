import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { GatheringService } from './gathering.service';
import { GatheringDto } from './dto/gathering.dto';
import { Gathering } from './schemas/gathering.shema';

@Controller('gatherings')
export class GatheringController {
  constructor(private readonly gatheringService: GatheringService) {}

  @Post()
  async create(@Body() createGatheringDto: GatheringDto): Promise<Gathering> {
    return this.gatheringService.create(createGatheringDto);
  }

  @Get()
  async findAll(): Promise<Gathering[]> {
    return this.gatheringService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Gathering> {
    return this.gatheringService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGatheringDto: GatheringDto,
  ): Promise<Gathering> {
    return this.gatheringService.update(id, updateGatheringDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.gatheringService.delete(id);
  }
}
