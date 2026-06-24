import { config } from 'dotenv';
import { createRequire } from 'module';
import { existsSync } from 'fs';

config();

const require = createRequire(import.meta.url);

if (!existsSync('.env')) {
  console.error('');
  console.error('No existe el archivo vendipro_back/.env');
  console.error('Copia .env.example a .env y configura DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE.');
  console.error('');
  console.error('Para producción: usa las mismas variables que tienes en Vercel → Settings → Environment Variables.');
  console.error('Alternativa: redespliega el backend en Vercel; la migración se aplica sola al arrancar.');
  console.error('');
  process.exit(1);
}

const host = process.env.DB_HOST ?? 'localhost';
const database = process.env.DB_DATABASE ?? 'pos_db';
console.log(`Migrando ${database} en ${host}...`);

const { runProductMigration } = require('../dist/database/product-migration.js');

runProductMigration()
  .then(() => {
    console.log('OK — migración de productos aplicada');
  })
  .catch((err) => {
    console.error('Error:', err.message ?? err);
    process.exit(1);
  });
