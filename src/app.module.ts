import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
<<<<<<< HEAD
import { UserModule } from './user/user.module';
=======
import { UsersModule } from './users/user.module';
import { CategoryModule } from './category/category.module';
>>>>>>> 379122c2af77bc35617cfebb8c6a3a1ff0f97ed9
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DistributorModule } from './distributor/distributor.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGO_URI,
      }),
    }),
    AuthModule,
<<<<<<< HEAD
    UserModule,
    DistributorModule,
=======
    UsersModule,
    CategoryModule,
>>>>>>> 379122c2af77bc35617cfebb8c6a3a1ff0f97ed9
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
