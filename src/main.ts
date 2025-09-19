import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validação global
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Configuração de CORS explícita
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:3000',
        'https://rotatelink-frontend-v1yw.vercel.app',
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin); // devolve o mesmo origin
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });


  const port = Number(process.env.PORT) || 3001;
  await app.listen(port);

  console.log(`Server running on http://localhost:${port}`);
}
bootstrap();


