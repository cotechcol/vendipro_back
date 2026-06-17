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

const [posProducts] = await c.query(
  `SELECT id, sku, name, product_type, stock, visible_in_pos
   FROM products
   WHERE store_id = ? AND active = 1 AND product_type != 'bulk' AND visible_in_pos = 1
   ORDER BY name`,
  [storeId],
);
console.log(JSON.stringify({ storeId, posVisibleCount: posProducts.length, posProducts }, null, 2));
await c.end();
