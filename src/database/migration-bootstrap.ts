import { runStoreMigration } from './store-migration';
import { runProductMigration } from './product-migration';
import { runSupplierMigration } from './supplier-migration';

let migrationPromise: Promise<void> | null = null;

/** Migraciones idempotentes; se ejecuta una vez por proceso (incluye cold starts en Vercel). */
export function ensureDatabaseMigrations(): Promise<void> {
  if (!migrationPromise) {
    migrationPromise = (async () => {
      await runStoreMigration();
      await runProductMigration();
      await runSupplierMigration();
      console.log('[migration] Esquema verificado');
    })().catch((err) => {
      migrationPromise = null;
      console.error('[migration] Error aplicando migraciones:', err);
      throw err;
    });
  }
  return migrationPromise;
}
