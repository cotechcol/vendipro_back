import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import type { Express } from 'express';
import { DataSource } from 'typeorm';
import { AppModule } from './app.module';

function isOriginAllowed(origin: string | undefined): boolean {
  if (!origin) return true;

  const configured = process.env.CORS_ORIGINS?.split(',').map((s) => s.trim()).filter(Boolean);
  if (configured?.length) {
    if (configured.includes('*')) return true;
    return configured.includes(origin);
  }

  if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
    return true;
  }

  try {
    return /\.vercel\.app$/i.test(new URL(origin).hostname);
  } catch {
    return false;
  }
}

export function applyAppConfig(app: INestApplication): void {
  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      callback(null, isOriginAllowed(origin));
    },
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

  if (process.env.VERCEL) {
    app.setGlobalPrefix('api');
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
}

export async function createNestApp(expressApp?: Express): Promise<INestApplication> {
  const logger: ('error' | 'warn' | 'log')[] = process.env.NODE_ENV === 'production'
    ? ['error', 'warn']
    : ['log', 'error', 'warn'];
  const nestOptions = { logger, abortOnError: false };

  const app = expressApp
    ? await NestFactory.create(AppModule, new ExpressAdapter(expressApp), nestOptions)
    : await NestFactory.create(AppModule, nestOptions);

  applyAppConfig(app);
  tuneMysqlSessions(app);
  return app;
}

/** Cierra en MySQL las conexiones de instancias Vercel congeladas (el timer de idle no corre). */
function tuneMysqlSessions(app: INestApplication): void {
  if (!process.env.VERCEL) return;
  try {
    const ds = app.get(DataSource);
    const pool = (ds.driver as { pool?: { on?: (event: string, cb: (connection: { query: (sql: string) => void }) => void) => void } }).pool;
    const sql = 'SET SESSION wait_timeout = 20, interactive_timeout = 20';
    pool?.on?.('connection', (connection) => {
      connection.query(sql);
    });
    void ds.query(sql).catch(() => undefined);
  } catch {
    // El pool sigue usable sin el ajuste de sesión.
  }
}
