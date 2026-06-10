import * as mysql from 'mysql2/promise';

const TABLES_WITH_STORE_ID = [
  'settings',
  'categories',
  'products',
  'customers',
  'suppliers',
  'sales',
  'cash_sessions',
  'purchases',
  'inventory_movements',
] as const;

export async function runStoreMigration(): Promise<void> {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USERNAME ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_DATABASE ?? 'pos_db',
  });

  try {
    const db = process.env.DB_DATABASE ?? 'pos_db';

    const [dbRows] = await connection.query<mysql.RowDataPacket[]>(
      'SELECT SCHEMA_NAME FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = ?',
      [db],
    );
    if (dbRows.length === 0) {
      console.log('[migration] Base de datos no existe aún; TypeORM la creará.');
      return;
    }

    await ensureStoresTable(connection);
    const defaultStoreId = await ensureDefaultStore(connection);

    for (const table of TABLES_WITH_STORE_ID) {
      await backfillStoreId(connection, table, defaultStoreId);
    }

    await backfillUsersStoreId(connection, defaultStoreId);
    await dropInvalidForeignKeys(connection, db);

    console.log(`[migration] Datos asignados a tienda default (id=${defaultStoreId}).`);
  } finally {
    await connection.end();
  }
}

async function ensureStoresTable(connection: mysql.Connection): Promise<void> {
  await connection.query(`
    CREATE TABLE IF NOT EXISTS stores (
      id INT NOT NULL AUTO_INCREMENT,
      name VARCHAR(150) NOT NULL,
      code VARCHAR(50) NOT NULL,
      address TEXT NULL,
      phone VARCHAR(20) NULL,
      active TINYINT NOT NULL DEFAULT 1,
      created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      PRIMARY KEY (id),
      UNIQUE KEY UQ_stores_code (code)
    ) ENGINE=InnoDB
  `);
}

async function ensureDefaultStore(connection: mysql.Connection): Promise<number> {
  const [rows] = await connection.query<mysql.RowDataPacket[]>(
    'SELECT id FROM stores ORDER BY id ASC LIMIT 1',
  );
  if (rows.length > 0) {
    return rows[0].id as number;
  }

  const [result] = await connection.query<mysql.ResultSetHeader>(
    `INSERT INTO stores (name, code, address, active)
     VALUES ('Tienda Demo POS', 'demo', 'Migración automática', 1)`,
  );
  return result.insertId;
}

async function tableExists(
  connection: mysql.Connection,
  table: string,
): Promise<boolean> {
  const [rows] = await connection.query<mysql.RowDataPacket[]>(
    `SELECT 1 FROM information_schema.TABLES
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
    [table],
  );
  return rows.length > 0;
}

async function columnExists(
  connection: mysql.Connection,
  table: string,
  column: string,
): Promise<boolean> {
  const [rows] = await connection.query<mysql.RowDataPacket[]>(
    `SELECT 1 FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [table, column],
  );
  return rows.length > 0;
}

async function backfillStoreId(
  connection: mysql.Connection,
  table: string,
  defaultStoreId: number,
): Promise<void> {
  if (!(await tableExists(connection, table))) return;

  if (!(await columnExists(connection, table, 'store_id'))) {
    await connection.query(
      `ALTER TABLE \`${table}\` ADD COLUMN store_id INT NULL`,
    );
  }

  await connection.query(
    `UPDATE \`${table}\` SET store_id = ? WHERE store_id IS NULL OR store_id = 0`,
    [defaultStoreId],
  );

  await connection.query(
    `UPDATE \`${table}\` t
     LEFT JOIN stores s ON t.store_id = s.id
     SET t.store_id = ?
     WHERE t.store_id IS NOT NULL AND s.id IS NULL`,
    [defaultStoreId],
  );
}

async function backfillUsersStoreId(
  connection: mysql.Connection,
  defaultStoreId: number,
): Promise<void> {
  if (!(await tableExists(connection, 'users'))) return;

  if (!(await columnExists(connection, 'users', 'store_id'))) {
    await connection.query(
      'ALTER TABLE users ADD COLUMN store_id INT NULL',
    );
  }

  // super_admin sin tienda; resto asignado a default
  await connection.query(
    `UPDATE users SET store_id = ? WHERE store_id IS NULL OR store_id = 0`,
    [defaultStoreId],
  );

  await connection.query(
    `UPDATE users u
     LEFT JOIN stores s ON u.store_id = s.id
     SET u.store_id = ?
     WHERE u.store_id IS NOT NULL AND s.id IS NULL`,
    [defaultStoreId],
  );

  await connection.query(
    `UPDATE users SET store_id = NULL WHERE role = 'super_admin'`,
  );
}

async function dropInvalidForeignKeys(
  connection: mysql.Connection,
  database: string,
): Promise<void> {
  const [fks] = await connection.query<mysql.RowDataPacket[]>(
    `SELECT TABLE_NAME, CONSTRAINT_NAME
     FROM information_schema.KEY_COLUMN_USAGE
     WHERE TABLE_SCHEMA = ?
       AND REFERENCED_TABLE_NAME = 'stores'
       AND COLUMN_NAME = 'store_id'`,
    [database],
  );

  for (const fk of fks) {
    const table = fk.TABLE_NAME as string;
    const constraint = fk.CONSTRAINT_NAME as string;
    try {
      await connection.query(
        `ALTER TABLE \`${table}\` DROP FOREIGN KEY \`${constraint}\``,
      );
    } catch {
      // FK ya eliminada o tabla en migración parcial
    }
  }
}
