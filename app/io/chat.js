'use strict';

var cookie = require('cookie'),
    mongoose = require('mongoose'),

    User = mongoose.model('User'),
    Message = mongoose.model('Message');

module.exports = function(io, sessionStore) {
  var _user = {};

  var chat = io.of('/chat');

  chat.on('connection', function(socket) {
    _user[socket.id] = {
      id: null,
      u: null
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

    socket.on('new message', function(text) {
      var message = new Message();
      message.text = text;
      message.author = _user[socket.id].u;
  
      message.save();

      //broadcast message to all users included emitter
      socket.broadcast.emit('message', message);
      socket.emit('message', message);
    });
  });
};
