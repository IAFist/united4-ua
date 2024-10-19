import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { GatheringService } from './gathering.service';
import { GatheringDto } from './dto/gathering.dto';
import { Gathering } from './schemas/gathering.shema';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { Types } from 'mongoose';

@Controller('gathering')
export class GatheringController {
  constructor(private readonly gatheringService: GatheringService) {}

  @Post()
  @Auth()
  async create(
    @Body() createGatheringDto: GatheringDto,
    @User('_id') userId: Types.ObjectId,
  ): Promise<Gathering> {
    return this.gatheringService.create(createGatheringDto, userId);
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
