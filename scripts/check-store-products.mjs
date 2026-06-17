import { config } from 'dotenv';
import mysql from 'mysql2/promise';

config();

const storeId = Number(process.argv[2] ?? 3);
const c = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const [store] = await c.query('SELECT id, name, code FROM stores WHERE id = ?', [storeId]);
const [products] = await c.query(
  'SELECT id, sku, name, product_type, active, stock FROM products WHERE store_id = ? ORDER BY name',
  [storeId],
);
console.log(JSON.stringify({ store: store[0], count: products.length, products }, null, 2));
await c.end();
