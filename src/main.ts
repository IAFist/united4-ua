import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'src/uploads'), {
    prefix: '/uploads/',
  });
  app.setGlobalPrefix('api')
	app.enableCors()
  await app.listen(4200);
}
bootstrap();
