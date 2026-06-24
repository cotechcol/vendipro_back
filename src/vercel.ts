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

async function bootstrap(): Promise<Express> {
  const app = express();
  const nestApp = await createNestApp(app);
  await nestApp.init();
  return app;
}

export async function getApp(): Promise<Express> {
  if (!expressApp) {
    if (!bootstrapPromise) {
      bootstrapPromise = bootstrap().then((app) => {
        expressApp = app;
        return app;
      }).catch((err) => {
        bootstrapPromise = undefined;
        throw err;
      });
    }
    expressApp = await bootstrapPromise;
  }
  return expressApp;
}

/** Entry point para Vercel (api/index.js) — usa req/res nativos de Node, no AWS Lambda. */
export async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  try {
    const app = await getApp();
    app(req, res);
  } catch (err) {
    console.error('[vercel] Error al iniciar la aplicación:', err);
    if (!res.headersSent) {
      res.statusCode = 503;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ statusCode: 503, message: 'Error al iniciar el servidor' }));
    }
  }
}
