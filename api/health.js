/** Health check independiente — no carga NestJS ni la base de datos */
module.exports = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    ok: true,
    dbHost: process.env.DB_HOST ?? null,
    dbDatabase: process.env.DB_DATABASE ?? null,
    hasJwtSecret: !!process.env.JWT_SECRET,
    node: process.version,
  }));
};
