import { config } from 'dotenv';
import type { INestApplication } from '@nestjs/common';
import type { Express, Request, Response } from 'express';
import { createNestApp } from './app-bootstrap';
import { runStoreMigration } from './database/store-migration';

config();

let cachedApp: INestApplication | null = null;

async function getApp(): Promise<INestApplication> {
  if (!cachedApp) {
    if (!process.env.VERCEL) {
      await runStoreMigration();
    }
    cachedApp = await createNestApp();
  }
  return cachedApp;
}

async function bootstrapLocal() {
  const app = await getApp();
  await app.listen(process.env.PORT ?? 3000);
}

export default async function handler(req: Request, res: Response): Promise<void> {
  const app = await getApp();
  const server = app.getHttpAdapter().getInstance() as Express;
  server(req, res);
}

if (!process.env.VERCEL) {
  bootstrapLocal();
}
