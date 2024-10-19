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

@Controller('gathering')
export class GatheringController {
  constructor(private readonly gatheringService: GatheringService) {}

  @Post('create')
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
  ): Promise<Gathering> {
    if (file) {
      createGatheringDto.img = file.filename;
    }

    return this.gatheringService.create(createGatheringDto, file);
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
