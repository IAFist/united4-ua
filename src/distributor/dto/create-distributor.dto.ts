import { IsString } from 'class-validator';

export class CreateDistributorDto {
  @IsString()
  name: string;

  @IsString()
  edrpou: string;
}
