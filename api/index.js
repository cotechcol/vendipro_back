const path = require('path');
const fs = require('fs');

function sendJson(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function loadHandler() {
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

  throw new Error(
    `No se encontró vercel.js. Rutas probadas: ${candidates.join(', ')}`,
  );
}

let handlerFn;

module.exports = async (req, res) => {
  try {
    if (!handlerFn) {
      handlerFn = loadHandler();
    }
    await handlerFn(req, res);
  } catch (err) {
    console.error('[api/index] Error:', err);
    if (!res.headersSent) {
      sendJson(res, 500, {
        statusCode: 500,
        message: err?.message ?? 'Error al cargar el servidor',
      });
    }
  }
};
