import * as mysql from 'mysql2/promise';

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

export async function runSupplierMigration(connection: mysql.Connection): Promise<void> {
  try {
    const [tables] = await connection.query<mysql.RowDataPacket[]>(
      `SELECT 1 FROM information_schema.TABLES
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'suppliers'`,
    );
    if (!tables.length) {
      console.log('[supplier-migration] Tabla suppliers no existe; omitiendo.');
      return;
    }

    if (!(await columnExists(connection, 'suppliers', 'nit'))) {
      await connection.query(`
        ALTER TABLE suppliers
        ADD COLUMN nit VARCHAR(20) NULL
        AFTER name
      `);
      console.log('[supplier-migration] Columna nit agregada');
    }

    await connection.query(`
      ALTER TABLE suppliers
      MODIFY COLUMN name VARCHAR(150) NULL
    `);
    console.log('[supplier-migration] Esquema de proveedores actualizado');
  } catch (err) {
    throw err;
  }
}
