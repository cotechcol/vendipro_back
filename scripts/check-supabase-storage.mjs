import { config } from 'dotenv';
import {
  S3Client,
  ListObjectsV2Command,
  HeadBucketCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import mysql from 'mysql2/promise';

config();

const endpoint = process.env.SUPABASE_S3_ENDPOINT?.trim();
const accessKeyId = process.env.SUPABASE_S3_ACCESS_KEY_ID?.trim();
const secretAccessKey = process.env.SUPABASE_S3_SECRET_ACCESS_KEY?.trim();
const region = process.env.SUPABASE_S3_REGION?.trim() || 'us-east-1';
const bucket = process.env.SUPABASE_STORAGE_BUCKET?.trim() || 'imagenes';

console.log('=== Config Supabase ===');
console.log({
  endpoint,
  region,
  bucket,
  accessKeyId: accessKeyId ? `${accessKeyId.slice(0, 8)}…` : null,
  secretOk: !!secretAccessKey,
});

if (!endpoint || !accessKeyId || !secretAccessKey) {
  console.error('Faltan variables SUPABASE_S3_*');
  process.exit(1);
}

const client = new S3Client({
  forcePathStyle: true,
  region,
  endpoint,
  credentials: { accessKeyId, secretAccessKey },
  requestChecksumCalculation: 'WHEN_REQUIRED',
  responseChecksumValidation: 'WHEN_REQUIRED',
});

async function main() {
  // 1) Bucket
  try {
    await client.send(new HeadBucketCommand({ Bucket: bucket }));
    console.log('\n[OK] Bucket accesible:', bucket);
  } catch (e) {
    console.error('\n[FAIL] HeadBucket:', e.message || e);
  }

  // 2) Listar objetos
  let keys = [];
  try {
    const listed = await client.send(new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: 'products/',
      MaxKeys: 20,
    }));
    keys = (listed.Contents || []).map((o) => o.Key);
    console.log(`\n[OK] Objetos en products/ (${keys.length}):`);
    keys.forEach((k) => console.log(' -', k));
    if (!keys.length) console.log(' (vacío — no hay archivos subidos aún)');
  } catch (e) {
    console.error('\n[FAIL] ListObjects:', e.message || e);
  }

  // 3) URL firmada de prueba
  if (keys[0]) {
    try {
      const url = await getSignedUrl(
        client,
        new GetObjectCommand({ Bucket: bucket, Key: keys[0] }),
        { expiresIn: 600 },
      );
      console.log('\n[OK] URL firmada (primer archivo):');
      console.log(url.slice(0, 120) + '…');

      const res = await fetch(url);
      console.log(`[${res.ok ? 'OK' : 'FAIL'}] GET firmada → HTTP ${res.status} ${res.headers.get('content-type')}`);
    } catch (e) {
      console.error('\n[FAIL] Signed URL:', e.message || e);
    }
  }

  // 4) URL pública (si el bucket es público)
  const publicBase = endpoint.replace(
    /\/storage\/v1\/s3\/?$/,
    `/storage/v1/object/public/${bucket}`,
  );
  if (keys[0]) {
    const pub = `${publicBase}/${keys[0]}`;
    try {
      const res = await fetch(pub);
      console.log(`\n[${res.ok ? 'OK' : 'FAIL'}] URL pública → HTTP ${res.status}`);
      console.log(' URL:', pub);
      if (!res.ok) {
        console.log(' → El bucket NO es público (o la política bloquea lectura). Se usarán URLs firmadas.');
      } else {
        console.log(' → Bucket público. Puedes poner SUPABASE_PUBLIC_URL en Vercel.');
        console.log(' SUPABASE_PUBLIC_URL=' + publicBase);
      }
    } catch (e) {
      console.error('[FAIL] fetch pública:', e.message || e);
    }
  }

  // 5) image_key en MySQL
  try {
    const c = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    const [cols] = await c.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'products' AND COLUMN_NAME = 'image_key'`,
      [process.env.DB_DATABASE],
    );
    console.log('\n=== Base de datos ===');
    console.log(cols.length ? '[OK] Columna products.image_key existe' : '[FAIL] Falta columna image_key');

    const [rows] = await c.query(
      `SELECT id, store_id, sku, name, image_key FROM products WHERE image_key IS NOT NULL LIMIT 20`,
    );
    console.log(`Productos con imagen: ${rows.length}`);
    rows.forEach((r) => console.log(` - #${r.id} store=${r.store_id} ${r.sku} → ${r.image_key}`));

    // Huérfanos: key en BD pero no en storage
    if (rows.length && keys.length) {
      const keySet = new Set(keys);
      const missing = rows.filter((r) => !keySet.has(r.image_key));
      if (missing.length) {
        console.log(`\n[WARN] ${missing.length} image_key en BD no listados en storage (prefijo products/):`);
        missing.forEach((r) => console.log(' -', r.image_key));
      }
    }
    await c.end();
  } catch (e) {
    console.error('\n[FAIL] MySQL:', e.message || e);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
