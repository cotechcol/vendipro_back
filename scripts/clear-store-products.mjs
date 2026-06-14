/**
 * Elimina todos los productos e inventario de una tienda por código.
 * Uso: node scripts/clear-store-products.mjs Flor-de-luna
 */
import { config } from 'dotenv';
import mysql from 'mysql2/promise';

config();

const storeCode = (process.argv[2] ?? '').trim();
if (!storeCode) {
  console.error('Uso: node scripts/clear-store-products.mjs <codigo-tienda>');
  process.exit(1);
}

const conn = await mysql.createConnection({
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USERNAME ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_DATABASE ?? 'pos_db',
});

const [stores] = await conn.query(
  'SELECT id, name, code FROM stores WHERE LOWER(code) = LOWER(?)',
  [storeCode],
);
if (!stores.length) {
  console.error(`Tienda no encontrada: ${storeCode}`);
  process.exit(1);
}

const storeId = stores[0].id;
console.log(`Limpiando: ${stores[0].name} (${stores[0].code})`);

const [prods] = await conn.query('SELECT id FROM products WHERE store_id = ?', [storeId]);
const ids = prods.map((p) => p.id);
console.log(`Productos: ${ids.length}`);

await conn.query('SET FOREIGN_KEY_CHECKS = 0');

const deletes = [
  ['sale_items', 'DELETE si FROM sale_items si INNER JOIN sales s ON s.id = si.sale_id WHERE s.store_id = ?'],
  ['sales', 'DELETE FROM sales WHERE store_id = ?'],
  ['purchase_items', 'DELETE pi FROM purchase_items pi INNER JOIN purchases p ON p.id = pi.purchase_id WHERE p.store_id = ?'],
  ['purchases', 'DELETE FROM purchases WHERE store_id = ?'],
  ['inventory_movements', 'DELETE FROM inventory_movements WHERE store_id = ?'],
];

for (const [label, sql] of deletes) {
  const [r] = await conn.query(sql, [storeId]);
  console.log(`  ${label}: ${r.affectedRows}`);
}

if (ids.length) {
  const ph = ids.map(() => '?').join(',');
  await conn.query(
    `DELETE po FROM product_options po
     INNER JOIN product_option_groups pog ON pog.id = po.group_id
     WHERE pog.product_id IN (${ph})`,
    ids,
  );
  await conn.query(`DELETE FROM product_option_groups WHERE product_id IN (${ph})`, ids);
  await conn.query(
    `DELETE FROM product_recipes WHERE product_id IN (${ph}) OR ingredient_product_id IN (${ph})`,
    [...ids, ...ids],
  );
}

const [del] = await conn.query('DELETE FROM products WHERE store_id = ?', [storeId]);
console.log(`  products: ${del.affectedRows}`);

await conn.query('SET FOREIGN_KEY_CHECKS = 1');

const [[{ n: left }]] = await conn.query(
  'SELECT COUNT(*) AS n FROM products WHERE store_id = ?',
  [storeId],
);
const [[{ n: mov }]] = await conn.query(
  'SELECT COUNT(*) AS n FROM inventory_movements WHERE store_id = ?',
  [storeId],
);

console.log(`Listo. Productos restantes: ${left}, movimientos: ${mov}`);
await conn.end();
