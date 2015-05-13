(function(app) {
  'use strict';

  var redirect = function($location, event) {
    $location.path("/login");

    event.preventDefault();
  };

  var run = ['$rootScope', '$location', '$authentication',
    function ($rootScope, $location, $authentication) {
      $rootScope.$on("$locationChangeStart", function(event, next, current) {
        if(next === $location.protocol() + '://' + location.host + '/#!' + '/' && !$authentication.isAuthenticated()) {
          return redirect($location, event);
        }

        for(var i in routes) {
          if(i != '/' && next.indexOf(i) != -1) {
            if(routes[i].auth === true && !$authentication.isAuthenticated()) {
              return redirect($location, event);
            }
          }
        }
      });
    }
  ];

  app.run(run);
} (app));
