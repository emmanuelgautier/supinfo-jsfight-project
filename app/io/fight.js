'use strict';

var cookie = require('cookie'),
    mongoose = require('mongoose'),

    User = mongoose.model('User'),
    Fight = mongoose.model('Fight');

module.exports = function(io, sessionStore) {

  var fight = io.of('/fight');

  var _user = {},
      _room = {};

  fight.on('connection', function(socket) {

    _user[socket.id] = {
      id: null,
      socket: socket,
      u: null,
      gamePosition: null,
      roomToken: null,
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

      if(!token) {
        return;
      }

      if(!_room[token]) {
        _room[token] = [];
      }

      _user[socket.id].roomToken = token;
      _room[token].push(socket.id);

      socket.join(token);

      socket.broadcast.emit('joining room', _user[socket.id].u);
    });

    socket.on('ready', function() {

      var room = _room[_user[socket.id].roomToken];

      //if the first player is already ready
      if(room.length === 2 && _user[room[0]].gamePosition != null) {

        _user[room[1]].gamePosition = 'right';

       _user[room[0]].socket.emit('start', _user[room[0]].gamePosition);
        _user[room[1]].socket.emit('start', _user[room[1]].gamePosition);

        return;
      }

      _user[room[0]].gamePosition = 'left';
    });

    socket.on('player status', function(status) {

      socket.to(_user[socket.id].roomToken).emit('status', status);
    });

    socket.on('win', function(time) {

      socket.to(_user[socket.id].roomToken).emit('win');
    });
  });
};
