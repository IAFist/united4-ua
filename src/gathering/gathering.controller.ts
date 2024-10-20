import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GatheringService } from './gathering.service';
import { GatheringDto } from './dto/gathering.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Gathering } from './schemas/gathering.shema';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { Types } from 'mongoose';
import { UpdateGatheringDto } from './dto/updategathering.dto';

@Controller('gathering')
export class GatheringController {
  constructor(private readonly gatheringService: GatheringService) {}

  @Post('create')
  @Auth()
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: 'src/uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = extname(file.originalname);
          cb(null, `${uniqueSuffix}${fileExt}`);
        },
      }),
    }),
  )
  async create(
    @Body() createGatheringDto: GatheringDto,
    @UploadedFile() file: Express.Multer.File,
    @User('_id') userId: Types.ObjectId,
  ): Promise<Gathering> {
    if (file) {
      createGatheringDto.img = file.filename;
    }

    return this.gatheringService.create(createGatheringDto, userId, file);
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
    @Body() updateGatheringDto: UpdateGatheringDto,
  ): Promise<Gathering> {
    console.log("1");
    return this.gatheringService.update(id, updateGatheringDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.gatheringService.delete(id);
  }
}
