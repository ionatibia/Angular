var amigosControllers = angular.module('amigosControllers', []);

amigosControllers.controller('amigosCtrl', ['$scope','$rootScope', 
  function($scope,$rootScope) {
    $rootScope.amigos = [
	{
		nombre:"juan",
		tlfno:"123456789"
	},
	{
		nombre:"pedro",
		tlfno:"123456789"
	},	
	{
		nombre:"luis",
		tlfno:"123456789"
	}
	];
	//$scope.amigos=$rootScope.amigos;
  }]);
amigosControllers.controller('amigoEditCtrl', ['$scope','$rootScope', '$routeParams',
  function($scope,$rootScope,$routeParams) {
  	/*for(i=0;i<$rootScope.amigos.length;i++){
  		if ($rootScope.amigos[i].nombre == $routeParams.amigoId) {
  			$scope.amigo=$rootScope.amigos[i];
  		}
  	}*/
  	$scope.amigo = $rootScope.amigos[$routeParams.amigoId];//muestra el indice en la url
  }]);
