import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TelegramModule } from 'src/telegram/telegram.module';
import { UserModule } from 'src/user/user.module';
import { DistributorController } from './distributor.controller';
import { DistributorService } from './distributor.service';
import { Distributor, DistributorSchema } from './schemas/distributor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Distributor.name, schema: DistributorSchema },
    ]),
    UserModule,
    forwardRef(() => TelegramModule),
  ],
  controllers: [DistributorController],
  providers: [DistributorService],
  exports: [DistributorService],
})
export class DistributorModule {}
