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

			



		
