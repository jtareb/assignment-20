; (function() {

	'use strict'

	angular.module('Assets')

	.controller('ItemsController', [ '$scope', 'ItemsFactory', '$rootScope', '$cacheFactory',

		function ($scope, ItemsFactory, $rootScope, $cacheFactory) {

				var cache = $cacheFactory.get('http');


				//$scope.allVehicles = [];


				   $scope.addVehicle = function(v){


				        ItemsFactory.add(v);
				        console.log(v);


      				};


      				$rootScope.$on('Vehicle:add', function(){
      				});


      				$scope.addAppliance = function(a){
      					ItemsFactory.addApp(a);
      					console.log(a);
      				};

      				$rootScope.$on('Appliance:add', function(){

      				});

			

			

			




			
		}
	])

}());



		
