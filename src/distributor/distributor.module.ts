import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
  ],
  controllers: [DistributorController],
  providers: [DistributorService],
})
export class DistributorModule {}
