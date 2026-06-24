import { config } from 'dotenv';
import type { Express } from 'express';
import express from 'express';
import type { IncomingMessage, ServerResponse } from 'http';
import { applyProcessTimezone } from './common/utils/timezone.util';
import { createNestApp } from './app-bootstrap';

config();
applyProcessTimezone();

let expressApp: Express | undefined;
let bootstrapPromise: Promise<Express> | undefined;
let bootstrapError: Error | undefined;

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

  const app = express();
  const nestApp = await createNestApp(app);
  await nestApp.init();
  console.log('[vercel] NestJS listo');
  return app;
}

export async function getApp(): Promise<Express> {
  if (bootstrapError) throw bootstrapError;

  if (!expressApp) {
    if (!bootstrapPromise) {
      bootstrapPromise = bootstrap()
        .then((app) => {
          expressApp = app;
          return app;
        })
        .catch((err: Error) => {
          bootstrapError = err;
          bootstrapPromise = undefined;
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

  if (url === '/api/health' || url === '/health' || url.startsWith('/api/health?')) {
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
