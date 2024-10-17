import { IsString } from 'class-validator';

export class GatheringDto {
  @IsString()
  name: string;

  @IsString()
  g_date: Date;

  @IsString()
  user: string;

  @IsString()
  text: string;

  @IsString()
  currentSum: number;

  @IsString()
  product: string;
}
