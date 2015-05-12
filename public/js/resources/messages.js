(function(app) {
  'use strict';

  var messages = ['$resource', function ($resource) {
      return $resource('messages/:token');
  }];

  app.factory('Message', messages);
} (app));
