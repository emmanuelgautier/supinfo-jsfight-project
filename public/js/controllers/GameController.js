(function(app, Game) {
  'use strict';

  var GameController = ['$scope', '$routeParams', '$socket', function($scope, $routeParams, $socket) {
    $scope.startGame = function() {
      Game.Core.setCanvas('fightArea');
      Game.Core.loadBackgroundImage('/images/zoneDeCombat.png');

      Game.setSocket($socket.fight);
      Game.start();
    };
  }];

  app.controller('GameController', GameController);
} (app, Game));
