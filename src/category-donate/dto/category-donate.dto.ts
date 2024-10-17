import { IsString } from 'class-validator';

export class CategoryDonateDto {
  @IsString()
  name: string;
}
