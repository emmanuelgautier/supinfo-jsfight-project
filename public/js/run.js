(function(app) {
  'use strict';

  app.run(run);

  var run = ['$rootScope', '$location', '$auth',
    function ($rootScope, $location, $auth) {
      $rootScope.$on("$locationChangeStart", function(event, next, current) {
        for(var i in routes) {
          if(next.indexOf(i) != -1) {
            if(routes[i].auth === true && !$auth.isAuthenticated()) {
              $location.path("/login");

              event.preventDefault();
            }
          }
        }
      });
    }
  ];
} (app));
