; (function() {

	'use strict'

	angular.module('Assets')

	.factory('ListsFactory', [ '$http', 'PARSE', 'UserFactory', '$rootScope',

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

			var getAllAppliances = function(){
				return $http.get(PARSE.URL + 'classes/appliances', PARSE.CONFIG)
				.success(function(){
					$rootScope.$broadcast('allAppliances: list');

					
				});
			};

			return {
				getAppliances: getAllAppliances
				
			};

		}
		

	]);

}());

			



		
