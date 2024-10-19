import { forwardRef, Module } from '@nestjs/common';
import { DistributorModule } from 'src/distributor/distributor.module';
import { TelegramService } from './telegram.service';

@Module({
  imports: [forwardRef(() => DistributorModule)],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {}
