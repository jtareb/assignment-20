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

			



		
