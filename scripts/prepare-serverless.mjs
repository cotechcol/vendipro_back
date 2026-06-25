import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distDir = path.join(root, 'dist');
const outDir = path.join(root, 'serverless', 'dist');

if (!fs.existsSync(path.join(distDir, 'vercel.js'))) {
  console.error('[prepare-serverless] Falta dist/vercel.js — ejecuta nest build primero');
  process.exit(1);
}

fs.rmSync(path.join(root, 'serverless'), { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
fs.cpSync(distDir, outDir, { recursive: true });

const count = fs.readdirSync(outDir, { recursive: true }).length;
console.log(`[prepare-serverless] Copiado dist → serverless/dist (${count} entradas)`);
