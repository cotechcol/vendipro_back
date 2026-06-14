import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express, { Express } from 'express';
import type { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';

let nestApp: INestApplication | null = null;
let initPromise: Promise<Express> | null = null;

async function configure(app: INestApplication): Promise<void> {
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
}

/** Inicializa NestJS una sola vez (reutilizado en Vercel y local) */
export async function getExpressApp(): Promise<Express> {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);

    nestApp = await NestFactory.create(AppModule, adapter, {
      logger:
        process.env.NODE_ENV === 'production'
          ? ['error', 'warn']
          : ['log', 'error', 'warn'],
    });

    await configure(nestApp);
    await nestApp.init();
    return expressApp;
  })();

  return initPromise;
}

export async function closeApp(): Promise<void> {
  if (nestApp) {
    await nestApp.close();
    nestApp = null;
    initPromise = null;
  }
}
