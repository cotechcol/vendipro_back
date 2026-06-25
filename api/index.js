'use strict';

const path = require('path');
const fs = require('fs');

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function pathOf(req) {
  const direct = (req.url || '/').split('?')[0];
  const original = req.headers['x-vercel-original-url'] || req.headers['x-invoke-path'];
  if (typeof original === 'string' && original.startsWith('/')) {
    return original.split('?')[0];
  }
  return direct;
}

function isLightRoute(p) {
  return (
    p === '/'
    || p === '/api'
    || p === '/api/ping'
    || p === '/ping'
    || p === '/api/health'
    || p === '/health'
  );
}

function lightResponse(p, res) {
  if (p === '/api/ping' || p === '/ping') {
    return sendJson(res, 200, { pong: true, ts: Date.now() });
  }
  return sendJson(res, 200, {
    ok: true,
    dbHost: process.env.DB_HOST || null,
    dbDatabase: process.env.DB_DATABASE || null,
    hasJwtSecret: !!process.env.JWT_SECRET,
    path: p,
  });
}

let nestHandler;

function loadNest() {
  const file = path.join(process.cwd(), 'dist', 'vercel.js');
  if (!fs.existsSync(file)) {
    throw new Error(`Build incompleto: no existe ${file}`);
  }
  return require(file).handler;
}

module.exports = (req, res) => {
  const p = pathOf(req);

  if (isLightRoute(p)) {
    return lightResponse(p, res);
  }

  (async () => {
    try {
      if (!nestHandler) nestHandler = loadNest();
      await nestHandler(req, res);
    } catch (err) {
      console.error('[api/index]', err);
      if (!res.headersSent) {
        sendJson(res, 500, { statusCode: 500, message: err?.message || 'Error del servidor' });
      }
    }
  })();
};
