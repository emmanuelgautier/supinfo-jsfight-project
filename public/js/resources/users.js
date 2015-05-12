(function(app) {
  'use strict';

  var users = ['$resource', function ($resource) {
      return $resource('users/:token');
  }];

  app.factory('User', users);
} (app));
