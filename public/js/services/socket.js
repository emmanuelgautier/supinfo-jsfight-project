(function(io, app) {
  'use strict';

  var socket = ['$rootScope', function ($rootScope) {
    var $socket = function(namespace) {
      var socket = io('/' + namespace),

          _room = null,

          mergeObject = function(o1, o2) {
            if(!o1 || typeof o1 != 'object')
              o1 = {};

            if(typeof o2 != 'object')
              return o1;

            if(!o1 || !o2)
              return o1;

            for(var k in o2)
              if(o2.hasOwnProperty(k))
                o1[k] = o2[k];

                return o1;
            }

        return {
          on: function (eventName, callback) {
            return socket.on(eventName, function () {
              var args = arguments;

              $rootScope.$apply(function () {
                callback.apply(socket, args);
              });
            });
          },

          emit: function (eventName, data, callback) {
            if(_room){
              data = mergeObject(data, { room: _room });
            }

            return socket.emit(eventName, data, function () {
              var args = arguments;

              $rootScope.$apply(function () {
                if (callback) {
                  callback.apply(socket, args);
                }
              });
            });
          },

          join: function(room) {
            if(namespace)
              _room = room;

            return socket.emit('room', room);
          }
        }
    };

    return {
      chat: $socket('chat'),
      fight: $socket('fight')
    };
  }];

  app.factory('$socket', socket);
} (io, app));
