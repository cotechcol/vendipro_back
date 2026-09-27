import * as mysql from 'mysql2/promise';
import type { DataSource, QueryRunner } from 'typeorm';
import { runStoreMigration } from './store-migration';
import { runProductMigration } from './product-migration';
import { runSupplierMigration } from './supplier-migration';
import { runTableMigration } from './table-migration';
import { runSaleMigration } from './sale-migration';
import { getMysqlSingleton, releaseMysqlSingleton } from './mysql-singleton';

/**
 * Subir este número cuando se agregue una migración nueva.
 * Evita re-escanear information_schema en cada cold start de Vercel.
 */
export const SCHEMA_VERSION = 8;

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

async function isSchemaCurrent(connection: mysql.Connection): Promise<boolean> {
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
}

async function markSchemaCurrent(connection: mysql.Connection): Promise<void> {
  await connection.query(
    `INSERT INTO _schema_meta (id, version) VALUES (1, ?)
     ON DUPLICATE KEY UPDATE version = VALUES(version)`,
    [SCHEMA_VERSION],
  );
}

async function applyMigrations(connection: mysql.Connection): Promise<void> {
  const started = Date.now();
  try {
    if (await isSchemaCurrent(connection)) {
      console.log(`[migration] Esquema al día (v${SCHEMA_VERSION}) en ${Date.now() - started}ms`);
      return;
    }
  } catch (err) {
    if (isTooManyConnections(err)) throw err;
    console.warn('[migration] No se pudo leer _schema_meta, se aplican migraciones:', err);
  }

  await runStoreMigration(connection);
  await runProductMigration(connection);
  await runSupplierMigration(connection);
  await runTableMigration(connection);
  await runSaleMigration(connection);

  try {
    await markSchemaCurrent(connection);
  } catch (err) {
    console.warn('[migration] No se pudo guardar versión de esquema:', err);
  }

  console.log(`[migration] Esquema verificado (v${SCHEMA_VERSION}) en ${Date.now() - started}ms`);
}

/**
 * En Vercel se reutiliza la conexión del pool de TypeORM (límite 1).
 * En local se usa el singleton y se cierra antes de que TypeORM abra el suyo.
 */
export function ensureDatabaseMigrations(dataSource?: DataSource): Promise<void> {
  if (!migrationPromise) {
    migrationPromise = (async () => {
      if (dataSource) {
        const runner: QueryRunner = dataSource.createQueryRunner();
        await runner.connect();
        try {
          const connection = (runner as unknown as { databaseConnection: mysql.Connection }).databaseConnection;
          await applyMigrations(connection);
        } finally {
          await runner.release();
        }
        return;
      }

      const connection = await getMysqlSingleton();
      try {
        await applyMigrations(connection);
      } finally {
        await releaseMysqlSingleton();
      }
    })().catch((err) => {
      migrationPromise = null;
      console.error('[migration] Error aplicando migraciones:', err);
      throw err;
    });
  }
  return migrationPromise;
}
