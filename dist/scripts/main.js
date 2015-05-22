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
    //.when('/appliances', {
    // templateUrl: 'scripts/lists/lists.appliances.tpl.html',
    //  controller: 'ApplianceCtrl'
    //})

    // View list of vehicles
    .when('/vehicles', {
      templateUrl: 'scripts/lists/lists.vehicle.tpl.html',
      controller: 'VehicleCtrl'
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


    // add an appliance
    .when('/addAppliance', {
     templateUrl: 'scripts/items/items.appliance.tpl.html',
      controller: 'ItemsController'
    })

    //viw list of appliances
    .when('/appliances', {
      templateUrl: 'scripts/lists/lists.appliance.tpl.html',
      controller: 'AppCtrl'
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
; (function()  {

	var d = new Date();
  	document.getElementById("date").innerHTML = d.toDateString();
}());
;(function (){
  

  'use strict'

  angular.module('Assets')

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

  angular.module('Assets')

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

  angular.module('Assets')

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

	angular.module('Assets')

	.factory('ListsFactory', [ '$http', 'PARSE', 'UserFactory', '$rootScope', '$location',

		function ( $http, PARSE, UserFactory, $rootScope, $location){

			var user = UserFactory.user();

			//get list of Vehicles
			var getAllVehicles = function(){
				return $http.get(PARSE.URL + 'classes/Vehicles', PARSE.CONFIG)
				.success(function(){
					$rootScope.$broadcast('allVehicles: list');
				});
			};
			//get list of appliances
			var getAllAppliances = function(){
				return $http.get(PARSE.URL + 'classes/Appliances', PARSE.CONFIG)
				.success(function(){
					$rootScope.$broadcast('allAppliances: list')
				});
			};



			return {

				get: getAllVehicles,
				getAppliances: getAllAppliances
		

				
			
			};

		}
		

	]);

}());

			



		

; (function() {

	'use strict'

	angular.module('Assets')

	.controller('VehicleCtrl', ['$scope', 'ListsFactory', '$rootScope', '$cacheFactory',

		function ($scope, ListsFactory, $rootScope, $cacheFactory) {

			var cache = $cacheFactory.get('http');


			

			$scope.allVehicles = [];

			 ListsFactory.get().success( function(data){
          		$scope.allVehicles = data.results;
          		console.log(data.results);
        		})
		}
	])
}());

; (function() {

	'use strict'

	angular.module('Assets')

	.controller('AppCtrl', ['$scope', 'ListsFactory', '$rootScope', '$cacheFactory',

		function ($scope, ListsFactory, $rootScope, $cacheFactory) {

			var cache = $cacheFactory.get('http');


			

			$scope.allAppliances = [];

			 ListsFactory.getAppliances().success( function(data){
          		$scope.allAppliances = data.results;
          		console.log(data.results);
        		})
		}
	])
}());

; (function() {

	'use strict'

	angular.module('Assets')

	.controller('ItemsController', [ '$scope', 'ItemsFactory', '$rootScope', '$cacheFactory',

		function ($scope, ItemsFactory, $rootScope, $cacheFactory) {

				var cache = $cacheFactory.get('http');


				//$scope.allVehicles = [];


				   $scope.addVehicle = function(v){


				        ItemsFactory.add(v);
				        console.log(v);


      				};


      				$rootScope.$on('Vehicle:add', function(){
      				});


      				$scope.addAppliance = function(a){
      					ItemsFactory.addApp(a);
      					console.log(a);
      				};

      				$rootScope.$on('Appliance:add', function(){

      				});

			

			

			




			
		}
	])

}());



		

; (function() {

	'use strict'

	angular.module('Assets')

	.factory('ItemsFactory', [ '$http', 'PARSE', '$location','$rootScope',
		function ($http, PARSE, $location, $rootScope){


			//add a vehicle
			var addVehicles = function(obj){
				$http.post(PARSE.URL + 'classes/Vehicles', obj, PARSE.CONFIG)
				.success(function(){
					$rootScope.$broadcast('vehicle: add');
				});
			};

			//add an appliance
			var addAppliance = function(obj){
				$http.post(PARSE.URL + 'classes/Appliances', obj, PARSE.CONFIG)
				.success(function(){
					$rootScope.$broadcast('appliance: add');
				});

			};



			return {
				add: addVehicles, 
				addApp: addAppliance
			
				

			};

		}
	])

}());
		
