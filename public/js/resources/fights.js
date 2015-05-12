(function(app) {
  'use strict';

  app.factory('Fight', fights);

  var fights = ['$resource', function ($resource) {
      return $resource('fights/:token');
  }];
} (app));
