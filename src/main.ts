import { config } from 'dotenv';
import { applyProcessTimezone } from './common/utils/timezone.util';

config();
applyProcessTimezone();

import { runStoreMigration } from './database/store-migration';
import { runProductMigration } from './database/product-migration';
import { runSupplierMigration } from './database/supplier-migration';
import { createNestApp } from './app-bootstrap';

async function runMigrations(): Promise<void> {
  if (process.env.VERCEL) return;
  try {
    await runStoreMigration();
    await runProductMigration();
    await runSupplierMigration();
  } catch (err) {
    console.error('[migration] Error aplicando migraciones:', err);
  }
}

async function bootstrap(): Promise<void> {
  await runMigrations();

  const app = await createNestApp();
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('[bootstrap]', err);
  process.exit(1);
});
