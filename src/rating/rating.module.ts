import { Module } from '@nestjs/common';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingSchema } from './schemas/rating.schema';
import { GatheringModule } from 'src/gathering/gathering.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Rating', schema: RatingSchema }]),
    GatheringModule,
  ],
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
