import { config } from 'dotenv';
import { applyProcessTimezone } from './common/utils/timezone.util';

config();
applyProcessTimezone();

import { runStoreMigration } from './database/store-migration';
import { runProductMigration } from './database/product-migration';
import { getExpressApp } from './app.factory';

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
  const expressApp = await getExpressApp();
  const port = process.env.PORT ?? 3000;
  expressApp.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
  });
}

if (!process.env.VERCEL) {
  bootstrap().catch((err) => {
    console.error('[bootstrap]', err);
    process.exit(1);
  });
}
