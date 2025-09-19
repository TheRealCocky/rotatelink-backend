import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validação global
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Configuração de CORS básica
  app.enableCors({
    origin: true, // libera qualquer origin
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });

  // Middleware para forçar Access-Control-Allow-Origin: *
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    );
    next();
  });

  const port = Number(process.env.PORT) || 3001;
  await app.listen(port);

  console.log(`Server running on http://localhost:${port}`);
}
bootstrap();



