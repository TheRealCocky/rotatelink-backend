import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validação global
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Middleware de CORS manual (antes de qualquer rota)
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Origin',
      'https://rotatelink-frontend-v1yw.vercel.app',
    );
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    );
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });

  const port = Number(process.env.PORT) || 3001;
  await app.listen(port);

  console.log(`Server running on http://localhost:${port}`);
}
bootstrap();

