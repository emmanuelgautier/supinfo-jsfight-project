'use strict';

var socket = require('socket.io');

module.exports = function(server, sessionStore, config) {
  var io = socket(server);

  require(config.root + '/app/io/fight')(io);
  require(config.root + '/app/io/chat')(io, sessionStore);
};
