import { createProxyMiddleware } from 'http-proxy-middleware';
import { Express } from 'express';

module.exports = function (app: Express) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:1337',
    })
  );
};
