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



		
