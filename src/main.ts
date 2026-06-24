import { config } from 'dotenv';
import { applyProcessTimezone } from './common/utils/timezone.util';
import { ensureDatabaseMigrations } from './database/migration-bootstrap';
import { createNestApp } from './app-bootstrap';

config();
applyProcessTimezone();

async function bootstrap(): Promise<void> {
  await ensureDatabaseMigrations();

  const app = await createNestApp();
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('[bootstrap]', err);
  process.exit(1);
});
