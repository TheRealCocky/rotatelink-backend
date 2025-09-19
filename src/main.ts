import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors({
    origin: [
      'http://localhost:3000', // Dev local
      'https://rotatelink-frontend-v1yw.vercel.app', // Produção no Vercel
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // 🚀 Render exige que a porta seja exatamente a do env
  await app.listen(Number(process.env.PORT));

  console.log(`Server running on port ${process.env.PORT}`);
}
bootstrap();
