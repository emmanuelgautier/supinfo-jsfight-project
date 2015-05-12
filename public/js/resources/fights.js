(function(app) {
  'use strict';

  var fights = ['$resource', function ($resource) {
      return $resource('fights/:token');
  }];

  app.factory('Fight', fights);
} (app));
