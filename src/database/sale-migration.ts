import * as mysql from 'mysql2/promise';

async function tableExists(connection: mysql.Connection, table: string): Promise<boolean> {
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

async function enumHasValue(
  connection: mysql.Connection,
  table: string,
  column: string,
  value: string,
): Promise<boolean> {
  const [rows] = await connection.query<mysql.RowDataPacket[]>(
    `SELECT COLUMN_TYPE FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [table, column],
  );
  const columnType = String(rows[0]?.COLUMN_TYPE ?? '');
  return columnType.includes(`'${value}'`);
}

async function indexExists(
  connection: mysql.Connection,
  table: string,
  indexName: string,
): Promise<boolean> {
  const [rows] = await connection.query<mysql.RowDataPacket[]>(
    `SELECT 1 FROM information_schema.STATISTICS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND INDEX_NAME = ?`,
    [table, indexName],
  );
  return rows.length > 0;
}

export async function runSaleMigration(connection: mysql.Connection): Promise<void> {
  try {
    if (!(await tableExists(connection, 'sales'))) {
      console.log('[sale-migration] Tabla sales no existe aún; se omite');
      return;
    }

    if (!(await columnExists(connection, 'sales', 'status'))) {
      await connection.query(`
        ALTER TABLE sales
        ADD COLUMN status ENUM('completed','reversed') NOT NULL DEFAULT 'completed'
        AFTER payment_method
      `);
      console.log('[sale-migration] Columna sales.status agregada');
    }

    if (!(await columnExists(connection, 'sales', 'reversed_at'))) {
      await connection.query(`
        ALTER TABLE sales
        ADD COLUMN reversed_at DATETIME NULL AFTER created_at
      `);
      console.log('[sale-migration] Columna sales.reversed_at agregada');
    }

    if (!(await columnExists(connection, 'sales', 'reversed_by_user_id'))) {
      await connection.query(`
        ALTER TABLE sales
        ADD COLUMN reversed_by_user_id INT NULL AFTER reversed_at
      `);
      console.log('[sale-migration] Columna sales.reversed_by_user_id agregada');
    }

    if (!(await columnExists(connection, 'sales', 'reverse_reason'))) {
      await connection.query(`
        ALTER TABLE sales
        ADD COLUMN reverse_reason VARCHAR(500) NULL AFTER reversed_by_user_id
      `);
      console.log('[sale-migration] Columna sales.reverse_reason agregada');
    }

    if (await tableExists(connection, 'sale_items')) {
      if (!(await columnExists(connection, 'sale_items', 'portion_scoop_count'))) {
        await connection.query(`
          ALTER TABLE sale_items
          ADD COLUMN portion_scoop_count INT NULL AFTER selected_options
        `);
        console.log('[sale-migration] Columna sale_items.portion_scoop_count agregada');
      }
    }

    if (await tableExists(connection, 'inventory_movements')) {
      if (
        await columnExists(connection, 'inventory_movements', 'type')
        && !(await enumHasValue(connection, 'inventory_movements', 'type', 'sale_reversal'))
      ) {
        await connection.query(`
          ALTER TABLE inventory_movements
          MODIFY COLUMN type ENUM(
            'sale','purchase','adjustment_in','adjustment_out','production','sale_reversal'
          ) NOT NULL
        `);
        console.log('[sale-migration] inventory_movements.type incluye sale_reversal');
      }
    }

    if (
      await tableExists(connection, 'sales')
      && !(await indexExists(connection, 'sales', 'IDX_sales_store_created_status'))
    ) {
      await connection.query(`
        CREATE INDEX IDX_sales_store_created_status
        ON sales (store_id, created_at, status)
      `);
      console.log('[sale-migration] Índice IDX_sales_store_created_status agregado');
    }

    console.log('[sale-migration] Esquema de ventas actualizado');
  } catch (err) {
    throw err;
  }
}
