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
