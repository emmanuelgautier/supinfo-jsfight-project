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
      roomToken: null
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

    socket.on('enter room', function(token) {
      _user[socket.id].roomToken = token;

      socket.broadcast.emit('joining room', _user[socket.id].u);
    })

    socket.on('player status', function(status) {

      socket.to(_user[socket.id].roomToken).emit('status', status);
    });

    socket.on('win', function(time) {

      socket.to(_user[socket.id].roomToken).emit('win');
    });
  });
};
