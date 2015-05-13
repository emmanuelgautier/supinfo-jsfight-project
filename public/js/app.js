(function(window, angular) {
  'use strict';

  var app = angular.module('fight', ['ngRoute', 'ngResource']);

  var routes = {
    '/': {
      templateUrl : 'templates/lobby.html',
      auth: true
    },
    '/login': {
      templateUrl : 'templates/login.html'
    },
    '/register': {
      templateUrl : 'templates/register.html'
    },
    '/fight/:token': {
      templateUrl : 'templates/fight.html',
      auth: true
    },
    '/statistics': {
      templateUrl: 'templates/statistics.html',
      auth: true
    }
  };

  var config = ['$routeProvider', '$locationProvider', 
    function ($routeProvider, $locationProvider) {
      for(var path in routes) {
        $routeProvider.when(path, routes[path]);
      }

      $routeProvider.otherwise({ redirectTo: '/' });

      $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
      });

      $locationProvider.hashPrefix('!');
    }
  ];

  app.config(config);

  window.app = app;
  window.routes = routes;
} (window, angular));
