(function(app) {
  'use strict';

  var session = ['$localStorage', function($localStorage) {
    $localStorage.session = $localStorage.session || {};

    return $localStorage.session;
  }];

  app.factory('$session', session);
} (app));
