import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { idValidationPipe } from 'src/pipes/id.validation.pipe';
import { User } from 'src/user/decorators/user.decorator';
import { SetRatingDto } from './dto/set-rating.dto';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get(':gatheringId')
  @Auth()
  async getMovieValueByUser(
    @User('_id') _id: Types.ObjectId,
    @Param('gatheringId', idValidationPipe) gatheringId: Types.ObjectId,
  ) {
    return this.ratingService.getGatheringValueByUser(gatheringId, _id);
  }

  @UsePipes(new ValidationPipe())
  @Post('set-rating')
  @HttpCode(200)
  @Auth()
  async setRating(@User('_id') _id: Types.ObjectId, @Body() dto: SetRatingDto) {
    return this.ratingService.setRating(_id, dto);
  }
}
