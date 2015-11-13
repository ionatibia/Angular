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
  }]);
amigosControllers.controller('amigoEditCtrl', ['$scope','$rootScope', '$routeParams',
  function($scope,$rootScope,$routeParams) {
  	console.log($rootScope);
  	console.log($routeParams);
  	for(i=0; i<$routeScope.amigos;i++){
  		if ($rootScope.amigos[i] == $routeParams.amigoId) {
  			$scope.amigo=$rootScope.amigos[i];
			/*{
				nombre:amigo.nombre,
				tlfno:amigo.telefono
			}*/
  		}
  	}
    
  }]);
