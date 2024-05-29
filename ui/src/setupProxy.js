const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  console.log('Proxy middleware is being used');

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:1338',
      changeOrigin: true,
      logLevel: 'debug',
    })
  );

  console.log('Proxy middleware setup complete');
};
