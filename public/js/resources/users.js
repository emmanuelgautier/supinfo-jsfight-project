(function(app) {
  'use strict';

  app.factory('User', users);

  var users = ['$resource', function ($resource) {
      return $resource('users/:token');
  }];
} (app));
