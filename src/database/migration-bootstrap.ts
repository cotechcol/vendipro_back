import * as mysql from 'mysql2/promise';
import { runStoreMigration } from './store-migration';
import { runProductMigration } from './product-migration';
import { runSupplierMigration } from './supplier-migration';
import { runTableMigration } from './table-migration';
import { runSaleMigration } from './sale-migration';

/**
 * Subir este número cuando se agregue una migración nueva.
 * Evita re-escanear information_schema en cada cold start de Vercel.
 */
export const SCHEMA_VERSION = 7;

let migrationPromise: Promise<void> | null = null;

export function isTooManyConnections(err: unknown): boolean {
  const seen = new Set<unknown>();
  let current: unknown = err;
  while (current && typeof current === 'object' && !seen.has(current)) {
    seen.add(current);
    const e = current as {
      code?: string;
      errno?: number;
      message?: string;
      driverError?: unknown;
      cause?: unknown;
    };
    if (
      e.code === 'ER_TOO_MANY_USER_CONNECTIONS'
      || e.code === 'ER_CON_COUNT_ERROR'
      || e.errno === 1203
      || e.errno === 1040
      || (typeof e.message === 'string' && e.message.includes('max_user_connections'))
    ) {
      return true;
    }
    current = e.driverError ?? e.cause;
  }
  return false;
}

async function createConnection(): Promise<mysql.Connection> {
  return mysql.createConnection({
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USERNAME ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_DATABASE ?? 'pos_db',
    connectTimeout: 8_000,
  });
}

async function isSchemaCurrent(): Promise<boolean> {
  const connection = await createConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS _schema_meta (
        id INT NOT NULL PRIMARY KEY,
        version INT NOT NULL,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
          ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    const [rows] = await connection.query<mysql.RowDataPacket[]>(
      'SELECT version FROM _schema_meta WHERE id = 1 LIMIT 1',
    );
    return Number(rows[0]?.version ?? 0) >= SCHEMA_VERSION;
  } finally {
    await connection.end();
  }
}

async function markSchemaCurrent(): Promise<void> {
  const connection = await createConnection();
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS _schema_meta (
        id INT NOT NULL PRIMARY KEY,
        version INT NOT NULL,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
          ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    await connection.query(
      `INSERT INTO _schema_meta (id, version) VALUES (1, ?)
       ON DUPLICATE KEY UPDATE version = VALUES(version)`,
      [SCHEMA_VERSION],
    );
  } finally {
    await connection.end();
  }
}

/** Migraciones idempotentes; se ejecuta una vez por proceso (incluye cold starts en Vercel). */
export function ensureDatabaseMigrations(): Promise<void> {
  if (!migrationPromise) {
    migrationPromise = (async () => {
      const started = Date.now();
      try {
        if (await isSchemaCurrent()) {
          console.log(`[migration] Esquema al día (v${SCHEMA_VERSION}) en ${Date.now() - started}ms`);
          return;
        }
      } catch (err) {
        // Si Hostinger ya rechazó la conexión, abrir 5 migraciones más empeora el corte.
        if (isTooManyConnections(err)) throw err;
        console.warn('[migration] No se pudo leer _schema_meta, se aplican migraciones:', err);
      }

      await runStoreMigration();
      await runProductMigration();
      await runSupplierMigration();
      await runTableMigration();
      await runSaleMigration();

      try {
        await markSchemaCurrent();
      } catch (err) {
        console.warn('[migration] No se pudo guardar versión de esquema:', err);
      }

      console.log(`[migration] Esquema verificado (v${SCHEMA_VERSION}) en ${Date.now() - started}ms`);
    })().catch((err) => {
      migrationPromise = null;
      console.error('[migration] Error aplicando migraciones:', err);
      throw err;
    });
  }
  return migrationPromise;
}
