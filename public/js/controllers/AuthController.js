(function(app) {
  'use strict';

  var AuthController = ['$scope', '$http', '$location', '$authentication',
    function($scope, $http, $location, $authentication) {
      $scope.login = function() {
        $http.post('/login', {
          username: this.username,
          password: this.password
        }).success(function(data, status) {
          $authentication.setUser(data);

          $location.path('/lobby');
        }).error(function(data, status) {
          $scope.password = null;
        });
      };

      $scope.register = function() {
        $http.post('/register', {
          username: this.username,
          password: this.password
        }).success(function(data, status) {

        }).error(function(data, status) {

        });
      };

      $scope.logout = function() {
        $http.get('/logout').success(function() {
          $authentication.logout();
        });
      };
    }
  ];

  app.controller('AuthController', AuthController);
} (app));
