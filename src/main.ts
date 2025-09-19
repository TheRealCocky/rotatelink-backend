import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Pipes globais
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // 🔓 Libera CORS (teste)
  app.enableCors({
    origin: true,
    credentials: true,
  });

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
  await app.listen(port);

  console.log(`🚀 Server running on port ${port}`);
}
bootstrap();


