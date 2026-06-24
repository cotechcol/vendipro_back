import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { applyProcessTimezone } from './common/utils/timezone.util';
import { ensureDatabaseMigrations } from './database/migration-bootstrap';
import { applyAppConfig } from './app-bootstrap';

config();
applyProcessTimezone();

async function bootstrap(): Promise<void> {
  try {
    await ensureDatabaseMigrations();
  } catch (err) {
    console.error('[bootstrap] Migraciones fallaron:', err);
    if (!process.env.VERCEL) process.exit(1);
  }

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
