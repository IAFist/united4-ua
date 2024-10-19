import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingSchema } from './schemas/rating.schema';
import { GatheringModule } from 'src/gathering/gathering.module';
import { VolonteerModule } from 'src/volonteer/volonteer.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Rating', schema: RatingSchema }]),
    GatheringModule,
    VolonteerModule,
  ],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
