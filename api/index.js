module.exports = async (req, res) => {
  try {
    const { handler } = require('../dist/vercel');
    await handler(req, res);
  } catch (err) {
    console.error('[api/index] Error fatal:', err);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        statusCode: 500,
        message: err?.message ?? 'Error al cargar el servidor',
      }));
    }
  }
};
