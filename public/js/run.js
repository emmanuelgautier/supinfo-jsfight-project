(function(app) {
  'use strict';

  var run = ['$rootScope', '$location', '$authentication',
    function ($rootScope, $location, $authentication) {
      $rootScope.$on("$locationChangeStart", function(event, next, current) {
        for(var i in routes) {
          if(next.indexOf(i) != -1) {
            if(routes[i].auth === true && !$authentication.isAuthenticated()) {
              $location.path("/login");
            }
          }
        }
      });
    }
  ];

  app.run(run);
} (app));
