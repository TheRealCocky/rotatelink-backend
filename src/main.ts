import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Validação global
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // ✅ CORS configurado explicitamente
  app.enableCors({
    origin: [
      'http://localhost:3000', // desenvolvimento
      'https://rotatelink-frontend-v1yw.vercel.app', // produção (Vercel)
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const port = Number(process.env.PORT) || 3001;
  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}`);
}
bootstrap();


