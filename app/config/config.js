'use strict';

var path     = require('path'),
    rootPath = path.normalize(__dirname + '/../..'),
    env      = process.env.NODE_ENV || 'development';

var config = {
  env: env,
  root: rootPath,
  secret: 'key',
  app: {
    name: 'fight',
  },
  cookie: { 
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 3600000
  },
  port: 3000,
  db: 'mongodb://localhost/fight'
};

module.exports = config;
