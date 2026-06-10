import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';

config();
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { runStoreMigration } from './database/store-migration';

async function bootstrap() {
  await runStoreMigration();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: (
      _origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => callback(null, true),
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Store-Id',
      'Accept',
      'Origin',
      'X-Requested-With',
    ],
    exposedHeaders: ['Authorization'],
    maxAge: 86_400,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
