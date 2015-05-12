(function(app) {
  'use strict';

  app.factory('Message', messages);

  var messages = ['$resource', function ($resource) {
      return $resource('messages/:token');
  }];
} (app));
