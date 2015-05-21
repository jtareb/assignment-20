;(function () {

  angular.module('Assets', ['ngRoute', 'ngCookies'])

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


    //view a list of appliances
    .when('/appliances', {
      templateUrl: 'scripts/lists/lists.appliances.tpl.html',
      controller: 'ListsController'
    })

    // View list of vehicles
    .when('/vehicles', {
      templateUrl: 'scripts/lists/lists.vehicle.tpl.html',
      controller: 'ListsController'
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
    .when('/addVehicle', {
      templateUrl: 'scripts/items/items.vehicle.tpl.html',
      controller: 'ItemsController'
    })


    // add vehicle
    .when('/addAppliance', {
      templateUrl: 'scripts/items/items.appliance.tpl.html',
      controller: 'ItemsController'
    })



    // Go Home ET
    .otherwise('/');
    
  }])

  .run([ '$rootScope', 'UserFactory', 'PARSE',

    function ($rootScope, UserFactory, PARSE) {
      

      $rootScope.$on('$routeChangeStart', function () {
        
        // Run my Login Status
        UserFactory.status();

        var user = UserFactory.user();
        

      })
    
   }

  ])

}());