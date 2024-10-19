import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { idValidationPipe } from 'src/pipes/id.validation.pipe';
import { User } from 'src/user/decorators/user.decorator';
import { DistributorService } from './distributor.service';
import { UpdateDistributorDto } from './dto/update-distributor.dto';

@Controller('distributor')
export class DistributorController {
  constructor(private distributorService: DistributorService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: UpdateDistributorDto, @User('_id') _id: string) {
    return this.distributorService.create(dto, _id, dto.photoUrl);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth('distributor')
  async update(
    @Param('id', idValidationPipe) id: Types.ObjectId,
    @Body() dto: UpdateDistributorDto,
  ) {
    return this.distributorService.update(dto, id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':id')
  @Auth('distributor')
  async delete(@Param('id', idValidationPipe) id: Types.ObjectId) {
    return this.distributorService.delete(id);
  }
}
