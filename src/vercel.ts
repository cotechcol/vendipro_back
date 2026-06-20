import { config } from 'dotenv';
import { applyProcessTimezone } from './common/utils/timezone.util';
import { createNestApp } from './app-bootstrap';
import express from 'express';
import serverlessExpress from '@vendia/serverless-express';

config();
applyProcessTimezone();

type ServerlessHandler = ReturnType<typeof serverlessExpress>;

let cached: ServerlessHandler | undefined;

async function bootstrap(): Promise<ServerlessHandler> {
  const expressApp = express();
  const app = await createNestApp(expressApp);
  await app.init();
  return serverlessExpress({ app: expressApp });
}

export async function handler(req: unknown, res: unknown, next?: unknown) {
  if (!cached) {
    cached = await bootstrap();
  }
  return cached(req, res, next);
}
