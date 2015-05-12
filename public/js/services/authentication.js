(function(app) {
  'use strict';

  var authentication = ['$session', function($session) {
    var $authentication = {};

    $authentication.setUser = function(user) {
      $session.user = user;
    };

    $authentication.isAuthenticated = function() {
      return !!$session.user && !!$session.user.id;
    };

    $authentication.logout = function() {
      $session.user = null;
    };

    return $authentication;
  }];

  app.factory('$authentication', authentication);
} (app));
