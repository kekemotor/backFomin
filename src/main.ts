import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseLoggerMiddleware } from './logger';
import cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, // позволит всем источникам доступа
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Добавление пользовательских заголовков
  app.use((req, res, next) => {
    console.log("ЗАПРОС")
    res.header('access-control-allow-origin', '*');
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('access-control-allow-headers', 'Content-Type, Authorization');
    
    // Добавление заголовка Access-Control-Allow-Credentials со значением true
    res.header('access-control-allow-credentials', 'true');

    next();
  })
  
  app.use((req,res,next)=>{const start = Date.now();
    
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    
    // Выводим информацию о запросе и ответе
    
    
    
      console.log('Response Body:', res);
    
  });

  next();});
    
  await app.listen(3000);
}
bootstrap();
