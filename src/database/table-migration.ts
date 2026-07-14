import * as mysql from 'mysql2/promise';

async function createConnection(): Promise<mysql.Connection> {
  return mysql.createConnection({
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USERNAME ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_DATABASE ?? 'pos_db',
  });
}

async function tableExists(connection: mysql.Connection, table: string): Promise<boolean> {
  const [rows] = await connection.query<mysql.RowDataPacket[]>(
    `SELECT 1 FROM information_schema.TABLES
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
    [table],
  );
  return rows.length > 0;
}

export async function runTableMigration(): Promise<void> {
  const connection = await createConnection();

  try {
    if (!(await tableExists(connection, 'restaurant_tables'))) {
      await connection.query(`
        CREATE TABLE restaurant_tables (
          id INT NOT NULL AUTO_INCREMENT,
          store_id INT NOT NULL,
          name VARCHAR(100) NOT NULL,
          capacity INT NOT NULL DEFAULT 4,
          active TINYINT(1) NOT NULL DEFAULT 1,
          sort_order INT NOT NULL DEFAULT 0,
          created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
            ON UPDATE CURRENT_TIMESTAMP(6),
          PRIMARY KEY (id),
          UNIQUE KEY UQ_restaurant_tables_store_name (store_id, name),
          KEY IDX_restaurant_tables_store (store_id),
          CONSTRAINT FK_restaurant_tables_store
            FOREIGN KEY (store_id) REFERENCES stores(id)
        ) ENGINE=InnoDB
      `);
      console.log('[table-migration] Tabla restaurant_tables creada');
    }

    if (!(await tableExists(connection, 'table_orders'))) {
      await connection.query(`
        CREATE TABLE table_orders (
          id INT NOT NULL AUTO_INCREMENT,
          store_id INT NOT NULL,
          table_id INT NOT NULL,
          status ENUM('open','closed') NOT NULL DEFAULT 'open',
          customer_id INT NULL,
          notes TEXT NULL,
          opened_by_user_id INT NOT NULL,
          closed_by_user_id INT NULL,
          sale_id INT NULL,
          open_table_id INT GENERATED ALWAYS AS (
            CASE WHEN status = 'open' THEN table_id ELSE NULL END
          ) STORED,
          created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
            ON UPDATE CURRENT_TIMESTAMP(6),
          PRIMARY KEY (id),
          UNIQUE KEY UQ_table_orders_open_table (store_id, open_table_id),
          KEY IDX_table_orders_store (store_id),
          KEY IDX_table_orders_table_status (table_id, status),
          KEY IDX_table_orders_sale (sale_id),
          CONSTRAINT FK_table_orders_store
            FOREIGN KEY (store_id) REFERENCES stores(id),
          CONSTRAINT FK_table_orders_table
            FOREIGN KEY (table_id) REFERENCES restaurant_tables(id),
          CONSTRAINT FK_table_orders_customer
            FOREIGN KEY (customer_id) REFERENCES customers(id),
          CONSTRAINT FK_table_orders_opened_by
            FOREIGN KEY (opened_by_user_id) REFERENCES users(id),
          CONSTRAINT FK_table_orders_closed_by
            FOREIGN KEY (closed_by_user_id) REFERENCES users(id),
          CONSTRAINT FK_table_orders_sale
            FOREIGN KEY (sale_id) REFERENCES sales(id)
        ) ENGINE=InnoDB
      `);
      console.log('[table-migration] Tabla table_orders creada');
    }

    if (!(await tableExists(connection, 'table_order_items'))) {
      await connection.query(`
        CREATE TABLE table_order_items (
          id INT NOT NULL AUTO_INCREMENT,
          order_id INT NOT NULL,
          product_id INT NOT NULL,
          product_name VARCHAR(250) NOT NULL,
          quantity INT NOT NULL,
          unit_price DECIMAL(12,2) NOT NULL,
          selected_option_ids JSON NULL,
          option_label VARCHAR(250) NULL,
          portion_scoop_count INT NULL,
          notes TEXT NULL,
          created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
          updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
            ON UPDATE CURRENT_TIMESTAMP(6),
          PRIMARY KEY (id),
          KEY IDX_table_order_items_order (order_id),
          KEY IDX_table_order_items_product (product_id),
          CONSTRAINT FK_table_order_items_order
            FOREIGN KEY (order_id) REFERENCES table_orders(id) ON DELETE CASCADE,
          CONSTRAINT FK_table_order_items_product
            FOREIGN KEY (product_id) REFERENCES products(id)
        ) ENGINE=InnoDB
      `);
      console.log('[table-migration] Tabla table_order_items creada');
    }

    console.log('[table-migration] Esquema de mesas actualizado');
  } finally {
    await connection.end();
  }
}
