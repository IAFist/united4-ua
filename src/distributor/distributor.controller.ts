import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/user/decorators/user.decorator';
import { DistributorService } from './distributor.service';
import { CreateDistributorDto } from './dto/create-distributor.dto';

@Controller('distributor')
export class DistributorController {
  constructor(private distributorService: DistributorService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@Body() dto: CreateDistributorDto, @User('_id') _id: string) {
    return this.distributorService.create(dto, _id);
  }
}
