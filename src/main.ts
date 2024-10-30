import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseLoggerMiddleware } from './logger';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Добавление пользовательских заголовков
  
  await app.listen(3000);
}
bootstrap();
