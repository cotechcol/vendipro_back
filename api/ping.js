/** Diagnóstico mínimo — si esto falla, el problema es la config de Vercel */
module.exports = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ pong: true, ts: Date.now() }));
};
