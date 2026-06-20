import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { applyProcessTimezone } from './common/utils/timezone.util';
import { runStoreMigration } from './database/store-migration';
import { runProductMigration } from './database/product-migration';
import { runSupplierMigration } from './database/supplier-migration';
import { applyAppConfig } from './app-bootstrap';

config();
applyProcessTimezone();

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

  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'production'
        ? ['error', 'warn']
        : ['log', 'error', 'warn'],
  });

  applyAppConfig(app);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('[bootstrap]', err);
  process.exit(1);
});
