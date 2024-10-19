import { IsString } from 'class-validator';

export class WalletDto {
  @IsString()
  card_account: string;
}
