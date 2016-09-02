angular.module('app',["ngRoute"])
	//Routes
	.config(function($routeProvider) {
	    $routeProvider
	    .when("/", {
	        templateUrl: "../views/main.html",
	        controller: 'MainCtrl'
	    })
	    .when("/dispensa", {
	        templateUrl: "../views/dispensa.html",
	        controller: 'DispensaCtrl' 
	    })
	    .when('/socios', {
	    	templateUrl: '../views/socios.html',
	    	controller: 'SociosCtrl'
	    })
	    .when('/productos', {
	    	templateUrl: '../views/productos.html',
	    	controller: 'ProductosCtrl'
	    })
	    .when('/informes', {
	    	templateUrl: '../views/informes.html',
	    	controller: 'InformesCtrl'
	    })
	    .when('/graficos', {
	    	templateUrl: '../views/graficos.html',
	    	controller: 'GraficosCtrl'
	    })
	    .otherwise({ redirectTo: '/' })
	})
	//Controller
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
			return true;
		}//check login	
	}])//AppCtrl controller