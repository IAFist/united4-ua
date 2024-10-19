import { Types } from 'mongoose';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { IsNumber, IsOptional } from 'class-validator';

export class SetRatingDto {
  @IsObjectId({ message: 'Gathering Id is invalid' })
  gatheringId: Types.ObjectId;

  @IsOptional()
  @IsObjectId({ message: 'Gathering Id is invalid' })
  volonteerId?: Types.ObjectId;

  @IsNumber()
  value: number;
}
