import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import type { Express } from 'express';
import { DataSource, QueryFailedError } from 'typeorm';
import { AppModule } from './app.module';
import { isTransientDbError } from './database/migration-bootstrap';

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
  app.useGlobalFilters(new MysqlQueryExceptionFilter());
}

type HttpReply = {
  headersSent?: boolean;
  status: (code: number) => { json: (body: unknown) => void };
};

@Catch(QueryFailedError)
class MysqlQueryExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost): void {
    const res = host.switchToHttp().getResponse<HttpReply>();
    if (res.headersSent) return;
    const lost = isTransientDbError(exception);
    if (!lost) console.error('[mysql]', exception.message);
    const status = lost ? HttpStatus.SERVICE_UNAVAILABLE : HttpStatus.INTERNAL_SERVER_ERROR;
    res.status(status).json({
      statusCode: status,
      message: lost
        ? 'Se cortó la conexión con la base de datos. Vuelve a intentar.'
        : 'No se pudo completar la operación',
    });
  }
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
  _fatalError?: Error | null;
  _protocolError?: Error | null;
  state?: string;
  lastActiveTime?: number;
  destroy: () => void;
  ping?: (cb: (err: Error | null) => void) => void;
  addCommand?: { name?: string };
  stream?: { destroyed?: boolean; readyState?: string };
};

type MysqlPool = {
  getConnection: (cb: PoolCallback) => void;
};

function isClosedConnection(connection: PooledConnection): boolean {
  const state = connection.state;
  return Boolean(
    connection._closing
    || connection._fatalError
    || connection._protocolError
    || state === 'disconnected'
    || state === 'error'
    || connection.stream?.destroyed
    || connection.stream?.readyState === 'closed'
    || connection.addCommand?.name === '_addCommandClosedState',
  );
}

function replaceConnection(connection: PooledConnection, left: number, attempt: (left: number) => void, cb: PoolCallback, err?: Error | null) {
  try {
    connection.destroy();
  } catch {
    // Ya estaba cerrada.
  }
  if (left <= 1) {
    cb(err ?? new Error('La conexión MySQL estaba cerrada'));
    return;
  }
  attempt(left - 1);
}

/** Hostinger cierra la sesión a los 20s. El ping tiene que fallar antes de que el cobro se quede esperando. */
const PING_TIMEOUT_MS = 2_500;
const IDLE_BEFORE_PING_MS = 8_000;

function useOrReplace(connection: PooledConnection, left: number, attempt: (left: number) => void, cb: PoolCallback) {
  if (isClosedConnection(connection)) {
    replaceConnection(connection, left, attempt, cb);
    return;
  }

  const idleMs = connection.lastActiveTime == null
    ? IDLE_BEFORE_PING_MS
    : Date.now() - connection.lastActiveTime;
  if (idleMs < IDLE_BEFORE_PING_MS || typeof connection.ping !== 'function') {
    cb(null, connection);
    return;
  }

  let settled = false;
  const timer = setTimeout(() => {
    if (settled) return;
    settled = true;
    replaceConnection(connection, left, attempt, cb, new Error('MySQL no respondió al ping'));
  }, PING_TIMEOUT_MS);

  try {
    connection.ping((pingErr) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (!pingErr) {
        cb(null, connection);
        return;
      }
      replaceConnection(connection, left, attempt, cb, pingErr);
    });
  } catch (pingErr) {
    if (settled) return;
    settled = true;
    clearTimeout(timer);
    replaceConnection(
      connection,
      left,
      attempt,
      cb,
      pingErr instanceof Error ? pingErr : new Error('Conexión MySQL cerrada'),
    );
  }
}

/**
 * Hostinger cierra la sesión a los 20s. La consulta de caja abierta usa esa
 * conexión muerta y TypeORM la marca como query failed. Si lleva rato idle, se hace ping.
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
          useOrReplace(connection, left, attempt, cb);
        });
      };
      attempt(3);
    };
  } catch {
    // El pool sigue usable sin este filtro.
  }
}
