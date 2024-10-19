import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GatheringService } from './gathering.service';
import { GatheringController } from './gathering.controller';
import { GatheringSchema } from './schemas/gathering.shema';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Gathering', schema: GatheringSchema }]),
    UserModule,
    ProductModule,
  ],
  controllers: [GatheringController],
  providers: [GatheringService],
  exports: [GatheringService],
})
export class GatheringModule {}
