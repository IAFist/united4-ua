import { IsNumber } from 'class-validator';
import { IsString } from 'class-validator';

export class UpdateGatheringDto {

  @IsNumber()
  currentSum: number;

}
