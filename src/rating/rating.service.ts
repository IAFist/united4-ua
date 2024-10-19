import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GatheringService } from 'src/gathering/gathering.service';
import { VolonteerService } from 'src/volonteer/volonteer.service';
import { SetRatingDto } from './dto/set-rating.dto';
import { RatingDocument } from './schemas/rating.schema';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel('Rating') private readonly ratingModel: Model<RatingDocument>,
    private readonly gatheringService: GatheringService,
    private readonly volonteerService: VolonteerService,
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

    return (
      ratingsMovie.reduce((acc, item) => acc + item.value, 0) /
      ratingsMovie.length
    );
  }

  async setRating(userId: Types.ObjectId, dto: SetRatingDto) {
    const { gatheringId, volonteerId, value } = dto;

    const newRatingByGathering = await this.ratingModel
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

    const averageRating = await this.averageRatingByGathering(gatheringId);

    await this.gatheringService.updateRating(gatheringId, averageRating);

    if (!volonteerId) {
      return newRatingByGathering;
    }

    const gatheringsByUser =
      await this.gatheringService.getGatheringsByUser(userId);

    const newRatingByVolonteer =
      gatheringsByUser.reduce((acc, item) => acc + item.rating, 0) /
      gatheringsByUser.length;

    await this.volonteerService.updateRating(volonteerId, newRatingByVolonteer);

    return newRatingByGathering;
  }
}
