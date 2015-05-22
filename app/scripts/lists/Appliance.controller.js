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
