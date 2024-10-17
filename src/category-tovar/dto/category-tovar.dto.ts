import { IsString } from 'class-validator';

export class CategoryTovarDto {
  @IsString()
  name: string;
}
