import { IsNumber } from 'class-validator';
import { IsString } from 'class-validator';

export class GatheringDto {
  @IsString()
  name: string;

  @IsString()
  g_date_start: Date;

  @IsString()
  g_date_finish: Date;

  @IsString()
  user: string;

  @IsString()
  text: string;

  @IsString()
  currentSum: number;

  @IsString()
  product: string;

  @IsNumber()
  countOfProduct: number;
}
