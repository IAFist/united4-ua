import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model, Types } from 'mongoose';
  import { UserService } from 'src/user/user.service';
  import { WalletDto } from './dto/wallet.dto';
  import { Wallet, WalletDocument } from './schemas/wallet.schemas';
  
  @Injectable()
  export class WalletService {
    constructor(
      @InjectModel(Wallet.name)
      private readonly walletModel: Model<Wallet>,
      private readonly userService: UserService,
    ) {}
  
    async create(
      dto: WalletDto,
      userId: string,
    ): Promise<WalletDocument> {
  
      const newWallet = await this.walletModel.create({
        name: dto.card_account,
        userId: userId,
      });
  
      return newWallet.save();
    }
  
    async update(
      dto: WalletDto,
      id: Types.ObjectId,
    ): Promise<WalletDocument> {
      const updateDoc = await this.walletModel
        .findByIdAndUpdate(id, dto, { new: true })
        .exec();
  
      if (!updateDoc) throw new NotFoundException('Wallet not found');
  
      return updateDoc;
    }
  
    async delete(id: Types.ObjectId) {
      const deleteDoc = await this.walletModel.findByIdAndDelete(id).exec();
      if (!deleteDoc) throw new NotFoundException('Wallet not found');
  
      return deleteDoc;
    }
  }
  