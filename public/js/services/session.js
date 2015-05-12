(function(app) {
  'use strict';

  app.factory('$session', session);

  var session = [function() {
    var $session = {};

    return $session;
  }];
} (app));
