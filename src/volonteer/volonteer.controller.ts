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
  } from '@nestjs/common';
  import { Types } from 'mongoose';
  import { Auth } from 'src/auth/decorators/auth.decorator';
  import { idValidationPipe } from 'src/pipes/id.validation.pipe';
  import { User } from 'src/user/decorators/user.decorator';
  import { VolonteerService } from './volonteer.service';
  import { VolonteerDto } from './dto/volonteer.dto';
  
  @Controller('volonteer')
  export class VolonteerController {
    constructor(private volonteerService: VolonteerService) {}
  
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post()
    @Auth()
    async create(@Body() dto: VolonteerDto, @User('_id') _id: string) {
      return this.volonteerService.create(dto, _id);
    }
  
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Put(':id')
    @Auth('distributor')
    async update(
      @Param('id', idValidationPipe) id: Types.ObjectId,
      @Body() dto: VolonteerDto,
    ) {
      return this.volonteerService.update(dto, id);
    }
  
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Delete(':id')
    @Auth('distributor')
    async delete(@Param('id', idValidationPipe) id: Types.ObjectId) {
      return this.volonteerService.delete(id);
    }
  }
  