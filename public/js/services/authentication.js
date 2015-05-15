(function(app) {
  'use strict';

  var authentication = ['$http', '$session', function($http, $session) {
    var $authentication = {};

    $authentication.setUser = function(user) {
      $session.user = user;
    };

    $authentication.isAuthenticated = function() {
      return !!$session.user && !!$session.user._id;
    };

    $authentication.logout = function() {
      $session.user = null;
    };

    if($authentication.isAuthenticated()) {
      $http.get('/me').success(function(user) {
        $session.user = user;
      }).error(function() {
        $session.user = null;
      });
    }

    return $authentication;
  }];

  app.factory('$authentication', authentication);
} (app));
