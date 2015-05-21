; (function() {

	'use strict'

	angular.module('Assets')

	.controller('ListsController', [ '$scope', 'ListsFactory', '$rootScope', '$cacheFactory',

		function ($scope, ListsFactory, $rootScope, $cacheFactory) {

			var cache = $cacheFactory.get('http');

			$scope.allVehicles = [];

			ListsFactory.getVehicles().success( function(data){
				$scope.allVehicles = data.results;
			});



			


		}
	])
}());