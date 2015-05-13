'use strict';

var cookie = require('cookie'),
    mongoose = require('mongoose'),

    User = mongoose.model('User'),
    Fight = mongoose.model('Fight');

module.exports = function(io, sessionStore) {

  var fight = io.of('/fight');

  fight.on('connection', function(socket) {
  var _user = {},
      _room = {};

    _user[socket.id] = {
      id: null,
      u: null,
      rooms: []
    };

    var cookies = socket.request.headers.cookie;
    if (cookies) {
      var sessionId = cookie.parse(cookies)['sid'];

      if (sessionId) {
        sessionId = sessionId.slice(2, sessionId.lastIndexOf('.'));

        sessionStore.get(sessionId, function(err, session) {
          if (session) {
            _user[socket.id].id = session.passport.user;

            User.findById(_user[socket.id].id, function(err, user) {
              if (err) { return; }

              _user[socket.id].u = user;
            });
          }
        });
      }
    }
  });
};
