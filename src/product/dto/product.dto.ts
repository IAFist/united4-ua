import { IsString } from 'class-validator';

export class ProductDto {
 @IsString()
  name: string;

  @IsString()
  img: string;

  @IsString()
  price: number;

  @IsString()
  category: string;
}
