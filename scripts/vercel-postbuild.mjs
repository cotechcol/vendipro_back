/**
 * Copia dist/ dentro de api/ para que el serverless function de Vercel
 * incluya el código compilado de NestJS en el bundle.
 */
import { cpSync, existsSync, rmSync } from 'fs';

if (!existsSync('dist')) {
  console.error('[vercel-postbuild] No existe dist/ — ejecuta nest build primero');
  process.exit(1);
}

rmSync('api/dist', { recursive: true, force: true });
cpSync('dist', 'api/dist', { recursive: true });
console.log('[vercel-postbuild] dist/ copiado a api/dist/');
