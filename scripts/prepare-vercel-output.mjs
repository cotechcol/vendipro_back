import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const src = path.join(root, 'dist');
const dest = path.join(root, 'vercel-output');

if (!fs.existsSync(path.join(src, 'vercel.js'))) {
  console.error('[prepare-vercel-output] Falta dist/vercel.js');
  process.exit(1);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.cpSync(src, dest, { recursive: true });
console.log(`[prepare-vercel-output] dist copiado a vercel-output/`);
