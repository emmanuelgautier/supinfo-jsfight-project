(function(app, Game) {
  'use strict';

  var GameController = ['$scope', '$routeParams', '$socket', function($scope, $routeParams, $socket) {
    $scope.startGame = function() {

      var roomToken = $routeParams.token;

      $socket.fight.emit('enter room', roomToken);

      Game.Core.setCanvas('fightArea');
      Game.Core.loadBackgroundImage('/images/fight_background.png');

      Game.setPlayersSprites(75, 75, ['/images/stickman.png', '/images/stickman_opponent.png']);
      Game.setSocket($socket.fight);
      Game.setLifeBars('user1-lifebar', 'user2-lifebar');
      Game.setTimer('timer');

      Game.preload();

      var waiting = setInterval(function() {
        if(Game.Core.ready()) {
          clearInterval(waiting);

          $socket.fight.emit('ready');

          $socket.fight.on('start', function(position) {
            Game.start(roomToken, position);
          });
        }
      }, 100);
    };
  }];

  app.controller('GameController', GameController);
} (app, Game));
