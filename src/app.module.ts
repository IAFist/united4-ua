import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryTovarModule } from './category-tovar/category-tovar.module';
import { CategoryDonateModule } from './category-donate/category-donate.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DistributorModule } from './distributor/distributor.module';
import { ProductModule } from './product/product.module';
import { GatheringModule } from './gathering/gathering.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGO_URI,
      }),
    }),
    AuthModule,
    DistributorModule,
    UserModule,
    CategoryTovarModule,
    ProductModule,
    GatheringModule,
    CategoryDonateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
