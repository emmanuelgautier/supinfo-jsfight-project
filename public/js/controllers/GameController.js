(function(app, Game) {
  'use strict';

  var GameController = ['$scope', '$routeParams', '$socket', function($scope, $routeParams, $socket) {
    $scope.startGame = function() {
      Game.Core.setCanvas('fightArea');
      Game.Core.loadBackgroundImage('/images/zoneDeCombat.png');

      Game.setPlayersSprites(75, 75, ['/images/stickman.png', '/images/stickman_opponent.png']);
      Game.setSocket($socket.fight);

      Game.preload();

      var waiting = setInterval(function() {
        if(Game.Core.ready()) {
          clearInterval(waiting);
          Game.start();
        }
      }, 100);
    };
  }];

  app.controller('GameController', GameController);
} (app, Game));
