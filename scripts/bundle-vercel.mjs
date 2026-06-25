import fs from 'node:fs';
import path from 'node:path';
import { build } from 'esbuild';

const root = process.cwd();
const outFile = path.join(root, 'api', 'nest.bundle.cjs');

if (!fs.existsSync(path.join(root, 'dist', 'vercel.js'))) {
  console.error('[bundle-vercel] Falta dist/vercel.js');
  process.exit(1);
}

const external = [
  'mysql2',
  'bcryptjs',
  '@nestjs/*',
  '@nestjs/microservices',
  '@nestjs/websockets/socket-module',
  '@nestjs/microservices/microservices-module',
  'typeorm',
  'express',
  'rxjs',
  'rxjs/*',
  'reflect-metadata',
  'class-transformer',
  'class-validator',
  'passport',
  'passport-jwt',
  'dotenv',
  '@aws-sdk/*',
];

await build({
  entryPoints: [path.join(root, 'dist', 'vercel.js')],
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'cjs',
  outfile: outFile,
  external,
  logLevel: 'info',
});

console.log(`[bundle-vercel] ${outFile} (${fs.statSync(outFile).size} bytes)`);
