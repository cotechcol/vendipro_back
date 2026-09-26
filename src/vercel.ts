import { config } from 'dotenv';
import type { Express } from 'express';
import express from 'express';
import type { IncomingMessage, ServerResponse } from 'http';
import { applyProcessTimezone } from './common/utils/timezone.util';
import { ensureDatabaseMigrations, isTooManyConnections } from './database/migration-bootstrap';
import { createNestApp } from './app-bootstrap';

config();
applyProcessTimezone();

let expressApp: Express | undefined;
let bootstrapPromise: Promise<Express> | undefined;
let bootstrapError: Error | undefined;
let retryAfter = 0;

function requestUrl(req: IncomingMessage): string {
  const raw = req.url ?? '/';
  const original = (req.headers as Record<string, string | string[] | undefined>)['x-vercel-original-url'];
  if (typeof original === 'string' && original.startsWith('/')) {
    return original.split('?')[0] + (raw.includes('?') ? raw.slice(raw.indexOf('?')) : '');
  }
  return raw;
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

async function bootstrap(): Promise<Express> {
  const dbHost = process.env.DB_HOST;
  if (!dbHost) {
    throw new Error('DB_HOST no está configurado en Vercel (Environment Variables)');
  }

  console.log(`[vercel] Iniciando NestJS — DB: ${dbHost}:${process.env.DB_PORT ?? 3306}`);

  await ensureDatabaseMigrations();

  const app = express();
  const nestApp = await createNestApp(app);
  await nestApp.init();
  console.log('[vercel] NestJS listo');
  return app;
}

export async function getApp(): Promise<Express> {
  if (expressApp) return expressApp;
  if (bootstrapError) throw bootstrapError;
  if (Date.now() < retryAfter) {
    throw new Error('MySQL rechazó conexiones (max_user_connections). Reintenta en unos segundos.');
  }

  if (!expressApp) {
    if (!bootstrapPromise) {
      bootstrapPromise = bootstrap()
        .then((app) => {
          expressApp = app;
          retryAfter = 0;
          return app;
        })
        .catch((err: Error) => {
          bootstrapPromise = undefined;
          // Si Hostinger está saturado, reintentar en la misma instancia cuando se liberen conexiones.
          if (isTooManyConnections(err)) {
            retryAfter = Date.now() + 20_000;
          } else {
            bootstrapError = err;
          }
          console.error('[vercel] Bootstrap falló:', err.message);
          throw err;
        });
    }
    expressApp = await bootstrapPromise;
  }
  return expressApp;
}

/** Entry point para Vercel (api/index.js) */
export async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const url = requestUrl(req);
  const pathOnly = url.split('?')[0];

  if (req.method === 'OPTIONS') {
    const origin = typeof req.headers.origin === 'string' ? req.headers.origin : '';
    if (origin) res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Store-Id, Accept, Origin, X-Requested-With');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.statusCode = 204;
    res.end();
    return;
  }

  if (pathOnly === '/api/ping' || pathOnly === '/ping') {
    sendJson(res, 200, { pong: true, ts: Date.now() });
    return;
  }

  if (pathOnly === '/' || pathOnly === '/api') {
    sendJson(res, 200, {
      ok: true,
      service: 'vendipro-back',
      dbHost: process.env.DB_HOST ?? null,
      dbDatabase: process.env.DB_DATABASE ?? null,
      hasJwtSecret: !!process.env.JWT_SECRET,
    });
    return;
  }

  if (pathOnly === '/api/health' || pathOnly === '/health') {
    sendJson(res, 200, {
      ok: true,
      dbHost: process.env.DB_HOST ?? null,
      dbDatabase: process.env.DB_DATABASE ?? null,
      hasJwtSecret: !!process.env.JWT_SECRET,
    });
    return;
  }

  try {
    const app = await getApp();
    app(req, res);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error desconocido';
    console.error('[vercel] Error:', err);
    if (!res.headersSent) {
      sendJson(res, 503, {
        statusCode: 503,
        message: 'No se pudo conectar a la base de datos',
        detail: message,
      });
    }
  }
}

export default handler;
