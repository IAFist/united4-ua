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
  card_account: string;

  @IsString()
  text: string;

  @IsNumber()
  currentSum: number;

  @IsNumber()
  donaters: number;

  @IsString()
  complete: boolean;

  @IsString()
  img: string;

  @IsNumber()
  totalSum: number;

  @IsNumber()
  countOfProduct: number;
}
