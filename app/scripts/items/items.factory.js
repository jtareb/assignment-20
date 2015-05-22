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
		
