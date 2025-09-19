import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validação global
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Habilita CORS para o frontend
  app.enableCors({
    origin: [
      'http://localhost:3000', // dev
      'https://rotatelink-frontend-v1yw.vercel.app', // produção (Vercel)
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT || 3001);

  console.log('Server running on http://localhost:3001');
}
bootstrap();
