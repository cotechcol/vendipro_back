const path = require('path');
const fs = require('fs');

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function getPath(req) {
  const direct = (req.url || '/').split('?')[0];
  const original = req.headers['x-vercel-original-url'] || req.headers['x-invoke-path'];
  if (typeof original === 'string' && original.startsWith('/')) {
    return original.split('?')[0];
  }
  return direct;
}

function isHealth(pathname) {
  return pathname === '/api/health' || pathname === '/health';
}

function loadNestHandler() {
  const candidates = [
    path.join(__dirname, 'dist', 'vercel.js'),
    path.join(__dirname, '..', 'dist', 'vercel.js'),
    path.join(process.cwd(), 'dist', 'vercel.js'),
  ];
  for (const file of candidates) {
    if (fs.existsSync(file)) {
      return require(file).handler;
    }
  }
  throw new Error(`vercel.js no encontrado. Rutas: ${candidates.join(', ')}`);
}

let nestHandler;

module.exports = (req, res) => {
  const pathname = getPath(req);

  if (isHealth(pathname)) {
    return sendJson(res, 200, {
      ok: true,
      dbHost: process.env.DB_HOST ?? null,
      dbDatabase: process.env.DB_DATABASE ?? null,
      hasJwtSecret: !!process.env.JWT_SECRET,
    });
  }

  (async () => {
    try {
      if (!nestHandler) nestHandler = loadNestHandler();
      await nestHandler(req, res);
    } catch (err) {
      console.error('[api] Error:', err);
      if (!res.headersSent) {
        sendJson(res, 500, {
          statusCode: 500,
          message: err?.message ?? 'Error del servidor',
        });
      }
    }
  })();
};
