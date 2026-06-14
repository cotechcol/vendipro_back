import { config } from 'dotenv';
import { applyProcessTimezone } from './common/utils/timezone.util';

config();
applyProcessTimezone();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { runStoreMigration } from './database/store-migration';
import { runProductMigration } from './database/product-migration';

async function runMigrations(): Promise<void> {
  if (process.env.VERCEL) return;
  try {
    await runStoreMigration();
    await runProductMigration();
  } catch (err) {
    console.error('[migration] Error aplicando migraciones:', err);
  }
}

async function bootstrap(): Promise<void> {
  await runMigrations();

  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn']
        : ['log', 'error', 'warn'],
  });

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

bootstrap().catch((err) => {
  console.error('[bootstrap]', err);
  process.exit(1);
});
