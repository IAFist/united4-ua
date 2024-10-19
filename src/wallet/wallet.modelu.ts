import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { Wallet, WalletSchema } from './schemas/wallet.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wallet.name, schema: WalletSchema },
    ]),
    UserModule,
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
