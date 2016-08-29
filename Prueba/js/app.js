angular.module('app',[])
	.controller('AppCtrl', ['$scope','$location', function ($scope,$location) {
		$scope.isActive = function (viewLocation) { 
        	return viewLocation === $location.path();
    	};
		$scope.loginOk = true;
	}])