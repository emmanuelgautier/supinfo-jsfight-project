(function(app) {
  'use strict';

  var ChatController = ['$scope', '$socket', function($scope, $socket) {
    var socket = $socket.chat;

    $scope.init = function() {
      socket.on('message', this.onNewMessage);
    };

    $scope.newMessage = function() {
      socket.emit('new message', this.text);
    };

    $scope.onNewMessage = function(message) {
      this.messages.push(message);
    };
  }];

  app.controller('ChatController', ChatController);
} (app));
