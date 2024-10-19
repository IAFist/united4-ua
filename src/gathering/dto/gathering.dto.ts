import { IsNumber } from 'class-validator';
import { IsString } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { Types } from 'mongoose';

export class GatheringDto {
  @IsString()
  name: string;

  @IsString()
  g_date_start: Date;

  @IsString()
  g_date_finish: Date;

  @IsString()
  text: string;

  @IsString()
  currentSum: number;

  @IsString()
  product: string;

  @IsNumber()
  countOfProduct: number;
}
