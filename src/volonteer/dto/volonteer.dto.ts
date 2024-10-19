import { IsString } from 'class-validator';

export class VolonteerDto {
  @IsString()
  name: string;
}
