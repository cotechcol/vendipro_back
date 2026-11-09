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

export async function runDepositMigration(connection: mysql.Connection): Promise<void> {
  if (await tableExists(connection, 'product_options')) {
    if (!(await columnExists(connection, 'product_options', 'is_deposit'))) {
      await connection.query(`
        ALTER TABLE product_options
        ADD COLUMN is_deposit TINYINT(1) NOT NULL DEFAULT 0
        AFTER unit_price
      `);
      console.log('[deposit-migration] Columna product_options.is_deposit agregada');
    }
  }

  if (!(await tableExists(connection, 'container_deposits'))) {
    await connection.query(`
      CREATE TABLE container_deposits (
        id INT NOT NULL AUTO_INCREMENT,
        store_id INT NOT NULL,
        code VARCHAR(12) NOT NULL,
        sale_id INT NOT NULL,
        cash_session_id INT NOT NULL,
        container_count INT NOT NULL,
        unit_amount DECIMAL(12,2) NOT NULL,
        total_amount DECIMAL(12,2) NOT NULL,
        returned_count INT NOT NULL DEFAULT 0,
        returned_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
        status ENUM('open','partial','returned','voided') NOT NULL DEFAULT 'open',
        created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
          ON UPDATE CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id),
        UNIQUE KEY UQ_container_deposits_store_code (store_id, code),
        KEY IDX_container_deposits_store_status (store_id, status),
        KEY IDX_container_deposits_sale (sale_id),
        CONSTRAINT FK_container_deposits_store
          FOREIGN KEY (store_id) REFERENCES stores(id),
        CONSTRAINT FK_container_deposits_sale
          FOREIGN KEY (sale_id) REFERENCES sales(id),
        CONSTRAINT FK_container_deposits_cash
          FOREIGN KEY (cash_session_id) REFERENCES cash_sessions(id)
      ) ENGINE=InnoDB
    `);
    console.log('[deposit-migration] Tabla container_deposits creada');
  }

  if (!(await tableExists(connection, 'container_deposit_returns'))) {
    await connection.query(`
      CREATE TABLE container_deposit_returns (
        id INT NOT NULL AUTO_INCREMENT,
        deposit_id INT NOT NULL,
        cash_session_id INT NOT NULL,
        user_id INT NOT NULL,
        quantity INT NOT NULL,
        amount DECIMAL(12,2) NOT NULL,
        created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        PRIMARY KEY (id),
        KEY IDX_deposit_returns_deposit (deposit_id),
        KEY IDX_deposit_returns_cash (cash_session_id),
        CONSTRAINT FK_deposit_returns_deposit
          FOREIGN KEY (deposit_id) REFERENCES container_deposits(id) ON DELETE CASCADE,
        CONSTRAINT FK_deposit_returns_cash
          FOREIGN KEY (cash_session_id) REFERENCES cash_sessions(id),
        CONSTRAINT FK_deposit_returns_user
          FOREIGN KEY (user_id) REFERENCES users(id)
      ) ENGINE=InnoDB
    `);
    console.log('[deposit-migration] Tabla container_deposit_returns creada');
  }
}
