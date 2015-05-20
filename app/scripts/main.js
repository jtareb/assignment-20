;(function () {

  angular.module('Vehicles', ['ngRoute', 'ngCookies'])

  .constant('PARSE', {
    
    URL:'https://api.parse.com/1/',
    CONFIG: {
      headers: {
          'X-Parse-Application-Id': 'TGTGRdNU2m3wCWDbM8An5C6wRsoUWDBhXlwFKsAO',
          'X-Parse-REST-API-Key':   'AqghD34BhsCJmyOpdGrUcTahmXL7hFzXoFP4cgf0',
          'Content-Type':           'application/json'
        }
      }
     }) 

    .config([ '$routeProvider', function ($routeProvider) {

    $routeProvider  

    // View list of vehicles
    .when('/vehicles', {
      templateUrl: 'scripts/lists/lists.vehicle.tpl.html',
      controller: 'ListController'
    })

    // Login Page
    .when('/login', {
      templateUrl: 'scripts/users/user.login.tpl.html',
      controller: 'UserController'
    })

    // Register page
    .when('/register', {
      templateUrl: 'scripts/users/user.register.tpl.html',
      controller: 'UserController'
    })

    // add vehicle
    .when('/add', {
      templateUrl: 'scripts/items/items.vehicle.tpl.html',
      controller: 'ItemsController'
    })

    // Go Home ET
    .otherwise('/');
    
  }])

  .run([ '$rootScope', 'UserFactory', 'SERVER',

    function ($rootScope, UserFactory, SERVER) {
      console.log('here');

      $rootScope.$on('$routeChangeStart', function () {
        
        // Run my Login Status
        UserFactory.status();
        

      })
    
   }

  ])

}());