(function(app) {
  'use strict';

  var session = [function() {
    var $session = {};

    return $session;
  }];

  app.factory('$session', session);
} (app));
