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
  import { WalletService } from './wallet.service';
  import { WalletDto } from './dto/wallet.dto';
  
  @Controller('wallet')
  export class WalletController {
    constructor(private walletService: WalletService) {}
  
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post()
    @Auth()
    async create(@Body() dto: WalletDto, @User('_id') _id: string) {
      return this.walletService.create(dto, _id);
    }
  
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Put(':id')
    @Auth()
    async update(
      @Param('id', idValidationPipe) id: Types.ObjectId,
      @Body() dto: WalletDto,
    ) {
      return this.walletService.update(dto, id);
    }
  
    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Delete(':id')
    @Auth()
    async delete(@Param('id', idValidationPipe) id: Types.ObjectId) {
      return this.walletService.delete(id);
    }
  }
  