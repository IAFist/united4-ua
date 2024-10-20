import { IsString } from 'class-validator';

export class ProductDto {
 @IsString()
  name: string;

  @IsString()
  img: string;

  @IsString()
  price: number;

  @IsString()
  opus: string;

  @IsString()
  categorytovar: string;

  @IsString()
  distributor: string;
}
