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

  @IsString()
  product: string;

  @IsNumber()
  countOfProduct: number;
}
