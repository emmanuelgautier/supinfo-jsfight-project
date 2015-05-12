'use strict';

var express      = require('express'),
    session      = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser');

module.exports = function(app, sessionStore, config) {
  app.use(express.static(config.root + '/public', {'index': ['index.html', 'index.htm']}));

  app.use(cookieParser());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

  app.use(session({
    name: 'sid',
    cookie: config.cookie,
    store: sessionStore,
    secret: config.secret,
    saveUninitialized: true,
    resave: false
  }));
};
