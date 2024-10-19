import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GatheringService } from 'src/gathering/gathering.service';
import { SetRatingDto } from './dto/set-rating.dto';
import { RatingDocument } from './schemas/rating.schema';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel('Rating') private readonly ratingModel: Model<RatingDocument>,
    private readonly gatheringService: GatheringService,
  ) {}

  async getGatheringValueByUser(
    gatheringId: Types.ObjectId,
    userId: Types.ObjectId,
  ) {
    return this.ratingModel
      .findOne({ gatheringId, userId })
      .select('value')
      .exec()
      .then((data) => (data ? data.value : 0));
  }

  async averageRatingByGathering(gatheringId: Types.ObjectId | string) {
    const ratingsMovie: RatingDocument[] = await this.ratingModel
      .aggregate()
      .match({
        gatheringId: gatheringId,
      })
      .exec();

    console.log(ratingsMovie);

    return (
      ratingsMovie.reduce((acc, item) => acc + item.value, 0) /
      ratingsMovie.length
    );
  }

  async setRating(userId: Types.ObjectId, dto: SetRatingDto) {
    console.log(dto);
    const { gatheringId, value } = dto;

    const newRating = await this.ratingModel
      .findOneAndUpdate(
        { gatheringId, userId },
        { gatheringId, userId, value },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        },
      )
      .exec();

    console.log(newRating);

    const averageRating = await this.averageRatingByGathering(gatheringId);

    console.log(averageRating);

    await this.gatheringService.updateRating(gatheringId, averageRating);

    return newRating;
  }
}
