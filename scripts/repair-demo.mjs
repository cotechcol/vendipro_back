import { config } from 'dotenv';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

config();

const DEMO_USERS = [
  { name: 'Super Administrador', email: 'super@pos.local', password: 'super123', role: 'super_admin', storeCode: null },
  { name: 'Administrador Bogotá', email: 'admin@pos.local', password: 'admin123', role: 'admin', storeCode: 'bogota' },
  { name: 'Administrador Cali', email: 'admin2@pos.local', password: 'admin123', role: 'admin', storeCode: 'cali' },
  { name: 'Juan Cajero', email: 'cajero@pos.local', password: 'cajero123', role: 'cashier', storeCode: 'bogota' },
];

const DEMO_STORES = [
  { code: 'bogota', name: 'Tienda Demo Bogotá', address: 'Calle 72 #10-34, Bogotá', phone: '601-5550100' },
  { code: 'cali', name: 'Tienda Demo Cali', address: 'Calle 15 #23-45, Cali', phone: '602-5550200' },
];

async function columnExists(conn, table, column) {
  const [rows] = await conn.query(
    `SELECT 1 FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [table, column],
  );
  return rows.length > 0;
}

async function tableExists(conn, table) {
  const [rows] = await conn.query(
    `SELECT 1 FROM information_schema.TABLES
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?`,
    [table],
  );
  return rows.length > 0;
}

async function runProductMigration(conn) {
  if (!(await tableExists(conn, 'products'))) return;

  if (!(await columnExists(conn, 'products', 'product_type'))) {
    await conn.query(`
      ALTER TABLE products
      ADD COLUMN product_type ENUM('simple','bulk','portion','composite') NOT NULL DEFAULT 'simple'
    `);
    console.log('✓ product_type');
  }

  if (!(await columnExists(conn, 'products', 'stock_unit'))) {
    await conn.query(`
      ALTER TABLE products ADD COLUMN stock_unit ENUM('unit','g','ml') NOT NULL DEFAULT 'unit'
    `);
    console.log('✓ stock_unit');
  }

  if (!(await columnExists(conn, 'products', 'base_product_id'))) {
    await conn.query(`ALTER TABLE products ADD COLUMN base_product_id INT NULL`);
    console.log('✓ base_product_id');
  }

  if (!(await columnExists(conn, 'products', 'portion_size'))) {
    await conn.query(`ALTER TABLE products ADD COLUMN portion_size DECIMAL(12,3) NULL`);
    console.log('✓ portion_size');
  }

  await conn.query(`
    ALTER TABLE products
    MODIFY COLUMN stock DECIMAL(12,3) NOT NULL DEFAULT 0,
    MODIFY COLUMN min_stock DECIMAL(12,3) NOT NULL DEFAULT 0
  `);

  if (!(await tableExists(conn, 'product_recipes'))) {
    await conn.query(`
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
    console.log('✓ product_recipes');
  }

  if (await tableExists(conn, 'inventory_movements')) {
    await conn.query(`
      ALTER TABLE inventory_movements
      MODIFY COLUMN quantity DECIMAL(12,3) NOT NULL,
      MODIFY COLUMN stock_before DECIMAL(12,3) NOT NULL,
      MODIFY COLUMN stock_after DECIMAL(12,3) NOT NULL
    `);
  }
}

async function ensureStore(conn, store) {
  const [rows] = await conn.query('SELECT id FROM stores WHERE code = ?', [store.code]);
  if (rows.length) return rows[0].id;

  const [result] = await conn.query(
    `INSERT INTO stores (name, code, address, phone, active) VALUES (?, ?, ?, ?, 1)`,
    [store.name, store.code, store.address, store.phone],
  );
  console.log(`✓ Tienda creada: ${store.name}`);
  return result.insertId;
}

async function ensureUser(conn, user, storeMap) {
  const storeId = user.storeCode ? storeMap.get(user.storeCode) : null;
  const hash = await bcrypt.hash(user.password, 10);

  const [rows] = await conn.query('SELECT id FROM users WHERE LOWER(email) = LOWER(?)', [user.email]);
  if (rows.length) {
    await conn.query(
      `UPDATE users SET name = ?, password_hash = ?, role = ?, store_id = ?, active = 1 WHERE id = ?`,
      [user.name, hash, user.role, storeId, rows[0].id],
    );
    console.log(`✓ Usuario actualizado: ${user.email} / ${user.password}`);
    return;
  }

  await conn.query(
    `INSERT INTO users (name, email, password_hash, role, store_id, active)
     VALUES (?, ?, ?, ?, ?, 1)`,
    [user.name, user.email, hash, user.role, storeId],
  );
  console.log(`✓ Usuario creado: ${user.email} / ${user.password}`);
}

console.log('=== REPARACIÓN DEMO VENDIPRO ===\n');

const conn = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

try {
  console.log('1. Migración de productos...');
  await runProductMigration(conn);

  console.log('\n2. Tiendas demo...');
  // Migrar tienda legacy "demo" → bogota
  const [legacy] = await conn.query("SELECT id FROM stores WHERE code = 'demo' LIMIT 1");
  if (legacy.length) {
    await conn.query(
      `UPDATE stores SET code = 'bogota', name = 'Tienda Demo Bogotá',
       address = 'Calle 72 #10-34, Bogotá', phone = '601-5550100' WHERE id = ?`,
      [legacy[0].id],
    );
    console.log('✓ Tienda legacy "demo" renombrada a bogota');
  }

  const storeMap = new Map();
  for (const s of DEMO_STORES) {
    storeMap.set(s.code, await ensureStore(conn, s));
  }

  console.log('\n3. Usuarios demo (contraseñas reseteadas)...');
  for (const u of DEMO_USERS) {
    await ensureUser(conn, u, storeMap);
  }

  console.log('\n4. Verificación login...');
  for (const u of DEMO_USERS) {
    const [rows] = await conn.query('SELECT password_hash FROM users WHERE LOWER(email) = LOWER(?)', [u.email]);
    const ok = rows.length && (await bcrypt.compare(u.password, rows[0].password_hash));
    console.log(`   ${u.email}: ${ok ? 'OK' : 'FALLA'}`);
  }

  console.log('\n✅ Reparación SQL completada.');
  console.log('   Ejecuta el seed de menú con: npm run db:menu\n');
} finally {
  await conn.end();
}
