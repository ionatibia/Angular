angular.module('app',["ngRoute"])
	.config(function($routeProvider) {
	    $routeProvider
	    .when("/", {
	        templateUrl : "../views/main.html"
	    })
	    .when("/dispensa", {
	        templateUrl : "../views/dispensa.html"
	    })
	})
	.controller('AppCtrl', ['$scope','$location', function ($scope,$location) {

		//Active links
		$scope.isActive = function (viewLocation) { 
        	return viewLocation === $location.path();
    	};

    	//Login comprobation
		$scope.checkLogin = function () {
			/*if ($scope.token) {
				return true;
			} else {
				return false;
			}*/
			return true
		}//check login

		//Collapse menu on hamurguer form
		$(function () {
            $('.navbar-collapse ul li a:not(.dropdown-toggle)').bind('click touchstart', function () {
                    $('.navbar-toggle:visible').click();
            });
    	});
	}])//AppCtrl controller