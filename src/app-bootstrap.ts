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
  discardClosedMysqlConnections(app);
  return app;
}

type PoolCallback = (err: Error | null, connection?: PooledConnection) => void;

type PooledConnection = {
  _closing?: boolean;
  destroy: () => void;
  stream?: { destroyed?: boolean; readyState?: string };
};

type MysqlPool = {
  getConnection: (cb: PoolCallback) => void;
};

function isClosedConnection(connection: PooledConnection): boolean {
  return Boolean(
    connection._closing
    || connection.stream?.destroyed
    || connection.stream?.readyState === 'closed',
  );
}

/**
 * Hostinger cierra la sesión a los 20s. Si la función de Vercel estuvo congelada,
 * el pool sigue entregando esa conexión y la consulta falla con "closed state".
 */
function discardClosedMysqlConnections(app: INestApplication): void {
  if (!process.env.VERCEL) return;
  try {
    const pool = (app.get(DataSource).driver as { pool?: MysqlPool }).pool;
    if (!pool) return;

    const original = pool.getConnection.bind(pool);
    pool.getConnection = (cb: PoolCallback) => {
      const attempt = (left: number) => {
        original((err, connection) => {
          if (err || !connection) {
            cb(err ?? new Error('No se pudo obtener conexión MySQL'));
            return;
          }
          if (!isClosedConnection(connection)) {
            cb(null, connection);
            return;
          }
          connection.destroy();
          if (left <= 1) {
            cb(new Error('La conexión MySQL estaba cerrada'));
            return;
          }
          attempt(left - 1);
        });
      };
      attempt(3);
    };
  } catch {
    // El pool sigue usable sin este filtro.
  }
}
