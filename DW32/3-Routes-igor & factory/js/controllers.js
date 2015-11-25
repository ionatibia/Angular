var amigosControllers = angular.module('amigosControllers', []);

//controlador para el index
/*amigosControllers.controller('appCtrl', ['$scope','$rootScope','$location', function($scope,$rootScope,$location){
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
}]);*/
amigosControllers.controller('appCtrl',function ($scope,$rootScope,$location) {
	//devolver class active segun scope
	$scope.isActive = function (viewLocation) {
		var active = (viewLocation === $location.path());
		return active;
	};
});


//controlador para la lista de amigos
/*amigosControllers.controller('amigosCtrl', ['$scope','$rootScope', 
  function($scope,$rootScope) {
    
	//$scope.amigos=$rootScope.amigos;
  }]);*/
amigosControllers.controller('amigosCtrl',['$scope','amigoSrv',
		function ($scope,amigoSrv) {
			$scope.amigos = amigoSrv.get();
		}]);

//controlador para la edicion de amigos
/*amigosControllers.controller('amigoEditCtrl', ['$scope','$rootScope', '$routeParams',
  function($scope,$rootScope,$routeParams) {
  		$scope.amigo = $rootScope.amigos[$routeParams.amigoId];//muestra el indice en la url
  }]);*/
amigosControllers.controller('amigoEditCtrl',['$scope','$rootScope','$routeParams','amigoSrv',
		function ($scope,$rootScope,$routeParams,amigoSrv) {
			$scope.amigo = amigoSrv.find($routeParams.amigoId);

			$scope.guardar=function () {
				console.log($scope.amigo.nombre);
				$rootScope.amigos[$routeParams.amigoId]=$scope.amigo;
			}
			$scope.eliminar=function () {
				$scope.amigo = amigoSrv.delete($routeParams.amigoId);
			}
		}]);

amigosControllers.controller('amigoNewCtrl', ['$scope','$rootScope','$routeParams', 'amigoSrv',
	function($scope,$rootScope,$routeParams,amigoSrv){
		$scope.amigo={nombre:"",tlfno:""};
		$scope.guardar=function() {
			if ($scope.amigo.nombre!="") {
				amigoSrv.add($scope.amigo);
				//$rootScope.amigos.push($scope.amigo);
			}
		}
}]);