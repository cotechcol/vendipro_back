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

/** Migración idempotente: columnas bulk/porción/compuesto y tabla product_recipes */
export async function runProductMigration(): Promise<void> {
  const connection = await createConnection();

  try {
    if (!(await tableExists(connection, 'products'))) {
      console.log('[product-migration] Tabla products no existe; TypeORM la creará.');
      return;
    }

    if (!(await columnExists(connection, 'products', 'product_type'))) {
      await connection.query(`
        ALTER TABLE products
        ADD COLUMN product_type ENUM('simple','bulk','portion','composite') NOT NULL DEFAULT 'simple'
        AFTER description
      `);
      console.log('[product-migration] Columna product_type agregada');
    }

    if (!(await columnExists(connection, 'products', 'stock_unit'))) {
      await connection.query(`
        ALTER TABLE products
        ADD COLUMN stock_unit ENUM('unit','g','ml') NOT NULL DEFAULT 'unit'
        AFTER product_type
      `);
      console.log('[product-migration] Columna stock_unit agregada');
    }

    if (!(await columnExists(connection, 'products', 'base_product_id'))) {
      await connection.query(`
        ALTER TABLE products
        ADD COLUMN base_product_id INT NULL
        AFTER stock_unit
      `);
      console.log('[product-migration] Columna base_product_id agregada');
    }

    if (!(await columnExists(connection, 'products', 'portion_size'))) {
      await connection.query(`
        ALTER TABLE products
        ADD COLUMN portion_size DECIMAL(12,3) NULL
        AFTER base_product_id
      `);
      console.log('[product-migration] Columna portion_size agregada');
    }

    await connection.query(`
      ALTER TABLE products
      MODIFY COLUMN stock DECIMAL(12,3) NOT NULL DEFAULT 0,
      MODIFY COLUMN min_stock DECIMAL(12,3) NOT NULL DEFAULT 0
    `);

    if (!(await tableExists(connection, 'product_recipes'))) {
      await connection.query(`
        CREATE TABLE product_recipes (
          id INT NOT NULL AUTO_INCREMENT,
          product_id INT NOT NULL,
          ingredient_product_id INT NOT NULL,
          quantity DECIMAL(12,3) NOT NULL,
          unit ENUM('unit','g','ml') NOT NULL DEFAULT 'g',
          PRIMARY KEY (id),
          KEY IDX_product_recipes_product (product_id),
          KEY IDX_product_recipes_ingredient (ingredient_product_id),
          CONSTRAINT FK_product_recipes_product
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
          CONSTRAINT FK_product_recipes_ingredient
            FOREIGN KEY (ingredient_product_id) REFERENCES products(id)
        ) ENGINE=InnoDB
      `);
      console.log('[product-migration] Tabla product_recipes creada');
    }

    if (!(await columnExists(connection, 'products', 'scoop_count'))) {
      await connection.query(`
        ALTER TABLE products
        ADD COLUMN scoop_count INT NULL
        AFTER portion_size
      `);
      console.log('[product-migration] Columna scoop_count agregada');
    }

    if (!(await tableExists(connection, 'product_option_groups'))) {
      await connection.query(`
        CREATE TABLE product_option_groups (
          id INT NOT NULL AUTO_INCREMENT,
          product_id INT NOT NULL,
          name VARCHAR(100) NOT NULL,
          kind ENUM('flavor','container') NOT NULL,
          min_select INT NOT NULL DEFAULT 1,
          max_select INT NOT NULL DEFAULT 1,
          sort_order INT NOT NULL DEFAULT 0,
          PRIMARY KEY (id),
          KEY IDX_option_groups_product (product_id),
          CONSTRAINT FK_option_groups_product
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        ) ENGINE=InnoDB
      `);
      console.log('[product-migration] Tabla product_option_groups creada');
    }

    if (!(await tableExists(connection, 'product_options'))) {
      await connection.query(`
        CREATE TABLE product_options (
          id INT NOT NULL AUTO_INCREMENT,
          group_id INT NOT NULL,
          name VARCHAR(100) NOT NULL,
          ingredient_product_id INT NOT NULL,
          quantity DECIMAL(12,3) NOT NULL,
          unit ENUM('unit','g','ml') NOT NULL DEFAULT 'g',
          PRIMARY KEY (id),
          KEY IDX_product_options_group (group_id),
          KEY IDX_product_options_ingredient (ingredient_product_id),
          CONSTRAINT FK_product_options_group
            FOREIGN KEY (group_id) REFERENCES product_option_groups(id) ON DELETE CASCADE,
          CONSTRAINT FK_product_options_ingredient
            FOREIGN KEY (ingredient_product_id) REFERENCES products(id)
        ) ENGINE=InnoDB
      `);
      console.log('[product-migration] Tabla product_options creada');
    }

    if (await tableExists(connection, 'sale_items')) {
      if (!(await columnExists(connection, 'sale_items', 'selected_options'))) {
        await connection.query(`
          ALTER TABLE sale_items
          ADD COLUMN selected_options JSON NULL
          AFTER subtotal
        `);
        console.log('[product-migration] Columna sale_items.selected_options agregada');
      }
    }

    if (await tableExists(connection, 'inventory_movements')) {
      await connection.query(`
        ALTER TABLE inventory_movements
        MODIFY COLUMN quantity DECIMAL(12,3) NOT NULL,
        MODIFY COLUMN stock_before DECIMAL(12,3) NOT NULL,
        MODIFY COLUMN stock_after DECIMAL(12,3) NOT NULL
      `);
    }

    if (await tableExists(connection, 'purchase_items')) {
      await connection.query(`
        ALTER TABLE purchase_items
        MODIFY COLUMN quantity DECIMAL(12,3) NOT NULL
      `);
    }

    if (await tableExists(connection, 'products')) {
      if (!(await columnExists(connection, 'products', 'visible_in_pos'))) {
        await connection.query(`
          ALTER TABLE products
          ADD COLUMN visible_in_pos TINYINT(1) NOT NULL DEFAULT 1
          AFTER active
        `);
        await connection.query(`
          UPDATE products SET visible_in_pos = 0 WHERE product_type = 'bulk'
        `);
        console.log('[product-migration] Columna products.visible_in_pos agregada');
      }
    }

    if (await tableExists(connection, 'product_options')) {
      if (!(await columnExists(connection, 'product_options', 'unit_cost'))) {
        await connection.query(`
          ALTER TABLE product_options
          ADD COLUMN unit_cost DECIMAL(12,2) NOT NULL DEFAULT 0
          AFTER unit
        `);
        await connection.query(`
          UPDATE product_options po
          INNER JOIN products p ON p.id = po.ingredient_product_id
          SET po.unit_cost = ROUND(p.cost_price * po.quantity, 2)
          WHERE po.unit_cost = 0 AND p.cost_price > 0
        `);
        console.log('[product-migration] Columna product_options.unit_cost agregada');
      }
    }

    console.log('[product-migration] Esquema de productos actualizado');
  } finally {
    await connection.end();
  }
}
