import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { VolonteerController } from './volonteer.controller';
import { VolonteerService } from './volonteer.service';
import { Volonteer, VolonteerSchema } from './schemas/volonteer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Volonteer.name, schema: VolonteerSchema },
    ]),
    UserModule,
  ],
  controllers: [VolonteerController],
  providers: [VolonteerService],
})
export class VolonteerModule {}
