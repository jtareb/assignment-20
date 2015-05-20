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
;(function (){
  

  'use strict'

  angular.module('Vehicles')

  .controller('NavCtrl', ['$scope', 'UserFactory', 

    function ($scope, UserFactory) {

      
    
      var user = UserFactory.user();

      if (user) {
        $scope.loggedin = true;
        $scope.user = user;
      } else {
        $scope.loggedin = false;
      }


      $scope.logout = function () {
        UserFactory.logout();
      };  


    }

  ])



}());
;(function (){
  
  'use strict';

  angular.module('Vehicles')

  .controller('UserController', ['$scope', 'UserFactory', '$location', 

    function ($scope, UserFactory, $location) {

      // If Currently Logged in - Leave this controller
      var user = UserFactory.user();
      if (user) {
        return $location.path('/');
      }

      // Add a new user
      $scope.registerUser = function (userObj) {
        UserFactory.register(userObj);
      };

      // Login Method
      $scope.loginUser = function (userObj) {
        UserFactory.login(userObj);
      };
    
    }

  ]);

}());
;(function (){
  
  'use strict';

  angular.module('Vehicles')

  .factory('UserFactory', ['$http', 'PARSE', '$cookieStore', '$location',

    function ($http, PARSE, $cookieStore, $location) {
    
      // Get Current User
      var currentUser = function () {
        return $cookieStore.get('currentUser');
      };

      // Check User Status
      var checkLoginStatus = function () {
        var user = currentUser();
        if (user) {
          PARSE.CONFIG.headers['X-PARSE-Session-Token'] = user.sessionToken;
        }
      };

      // Add a new User
      var addUser = function (userObj) {
        $http.post(PARSE.URL + 'users', userObj, PARSE.CONFIG)
          .then( function (res) {
            console.log(res);
          }
        );
      };

      // Log in a User
      var loginUser = function (userObj) {

        $http({
          method: 'GET',
          url: PARSE.URL + 'login',
          headers: PARSE.CONFIG.headers,
          params: userObj
        }).then (function (res) {
          console.log(res);
          $cookieStore.put('currentUser', res.data);
        });
        
      };

      // Logout Method
      var logoutUser = function () {
        $cookieStore.remove('currentUser');
        $location.path('/login');
      }
  
      return {
        register : addUser, 
        login : loginUser,
        user : currentUser,
        status : checkLoginStatus,
        logout : logoutUser
      };

    }

  ]);

}());
; (function() {

	'use strict'

	angular.module('Vehicles')

	.controller('ListsController', [ '$scope', 'ListsFactory', '$rootScope', '$location',

		function ($scope, ListsFactory, $rootScope, $location) {

			$scope.allVehicles = [];

			ListsFactory.getVehicles().success( function(data){
				$scope.allVehicles = data.results;
			});

			


		}
	])
}());
; (function() {

	'use strict'

	angular.module('Vehicles')

	.factory('listsFactory', [ '$http', 'PARSE', 'UserFactory', '$rootScope',

		function ( $http, PARSE, UserFactory, $rootScope){

			var user = UserFactory.user();

			//get list
			var getAllVehicles = function(){
				return $http.get(PARSE.URL + 'classes/vehicles', PARSE.CONFIG)
				.success(function(){
					$rootScope.$broadcast('allVehicles: list');
				});
			};


			return {

				getVehicles: getAllVehicles
			
			};
		}

	]);

}());

			



		

; (function() {

	'use strict'

	angular.module('Vehicles')

	.controller('itemsController', [ '$scope', 'ItemsFactory', '$rootScope', 

		function ($scope, ItemsFactory, $rootScope) {

			$scope.allVehicles = [];

			$scope.addVehicle = function(v){
				ItemsFactory.add(v);
				console.log(v);
			};

			$rootScope.$on('Vehicle:add', function(){

			});
		}
	])

}());



		

; (function() {

	'use strict'

	angular.module('Vehicles')

	.factory('itemsFactory', [ '$http', 'PARSE', '$location','$rootScope',
		function ($http, PARSE, $location, $rootScope){

			var addVehicle = function(obj){
				$http.post(PARSE.URL + 'classes/Vehicles', obj, PARSE.CONFIG)
				.success(function(){
					$rootScope.$broadcast('vehicle: add');
				});
			};

			return {
				add: addVehicle
			};

		}
	])

}());
		
