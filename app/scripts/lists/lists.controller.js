; (function() {

	'use strict'

	angular.module('Vehicles')

	.controller('listsController', [ '$scope', 'ListsFactory', '$rootScope', '$location',

		function ($scope, ListsFactory, $rootScope, $location) {

			$scope.allVehicles = [];

			ListsFactory.getVehicles().success( function(data){
				$scope.allVehicles = data.results;
			});

			


		}
	])
}());