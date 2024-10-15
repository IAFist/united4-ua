import { IsString } from 'class-validator';

export class UpdateDistributorDto {
  @IsString()
  name: string;

  @IsString()
  edrpou: string;
}
