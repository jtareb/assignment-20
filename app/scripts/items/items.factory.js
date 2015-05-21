; (function() {

	'use strict'

	angular.module('Assets')

	.factory('ItemsFactory', [ '$http', 'PARSE', '$location','$rootScope',
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
		
