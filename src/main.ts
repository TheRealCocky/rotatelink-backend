import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://rotatelink-frontend-v1yw.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // 🔑 Se não houver PORT no .env, usa 3001
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}`);
}
bootstrap();
