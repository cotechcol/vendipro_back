const { getExpressApp } = require('../dist/app.factory');

module.exports = async (req, res) => {
  const app = await getExpressApp();
  return app(req, res);
};
