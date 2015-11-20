var amigosControllers = angular.module('amigosControllers', []);

//controlador para el index
amigosControllers.controller('appCtrl', ['$scope','$rootScope','$location', function($scope,$rootScope,$location){
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
	$scope.isActive=function(viewLocation) {
		return viewLocation === $location.path();
	};
}]);

//devolver class active segun scope


//controlador para la lista de amigos
amigosControllers.controller('amigosCtrl', ['$scope','$rootScope', 
  function($scope,$rootScope) {
    
	//$scope.amigos=$rootScope.amigos;
  }]);

//controlador para la edicion de amigos
amigosControllers.controller('amigoEditCtrl', ['$scope','$rootScope', '$routeParams',
  function($scope,$rootScope,$routeParams) {
  	/*for(i=0;i<$rootScope.amigos.length;i++){
  		if ($rootScope.amigos[i].nombre == $routeParams.amigoId) {
  			$scope.amigo=$rootScope.amigos[i];
  		}
  	}*/
  		$scope.amigo = $rootScope.amigos[$routeParams.amigoId];//muestra el indice en la url
  }]);

amigosControllers.controller('amigoNewCtrl', ['$scope','$rootScope','$routeParams', 
	function($scope,$rootScope,$routeParams){
		$scope.amigo={nombre:"",tlfno:""};
		$scope.guardar=function() {
			if ($scope.amigo.nombre!="") {
				$rootScope.amigos.push($scope.amigo);
			}
		}
}]);