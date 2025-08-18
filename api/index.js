const { createServer } = require('@vercel/node');
const app = require('../server/src/server').default;

module.exports = app;

// For Vercel serverless functions
module.exports = (req, res) => {
  return createServer(app)(req, res);
};
