var amigosControllers = angular.module('amigosControllers', ['mgcrea.ngStrap','ngAnimate']);

//controlador para el index
amigosControllers.controller('appCtrl',function ($scope,$rootScope,$location) {
	//devolver class active segun scope
	$scope.isActive = function (viewLocation) {
		var active = (viewLocation === $location.path());
		return active;
	};
});


//controlador para la lista de amigos
amigosControllers.controller('amigosCtrl',['$scope','amigoSrv',
		function ($scope,amigoSrv) {
			$scope.amigos = amigoSrv.get();
		}]);

//controlador para la edicion de amigos
amigosControllers.controller('amigoEditCtrl',['$scope','$rootScope','$routeParams','amigoSrv', '$modal',
		function ($scope,$rootScope,$routeParams,amigoSrv,$modal) {
			$scope.amigo = amigoSrv.find($routeParams.amigoId);

			$scope.guardar=function () {
				console.log($scope.amigo.nombre);
				$rootScope.amigos[$routeParams.amigoId]=$scope.amigo;
			}
			$scope.eliminar=function () {
				$scope.amigo = amigoSrv.delete($routeParams.amigoId);
/*<<<<<<<<<<<<<<<<Desde aqui>>>>>>>>>>>>>>>>*/
				$scope.myModal.hide();
				//myModal.hide();
			}

			$scope.myModal = $modal({ scope: $scope, templateUrl:'modal.html', show:false});
			$scope.askEliminar=function () {
				//var myModal = $modal({scope: $scope, templateUrl:'modal.html', show:true});
				$scope.myModal.show();
			};
			/*$scope.modal = {
			  "title": "Seguro???",
			  "content": "Quieres borrar al amigo "+$scope.amigo.nombre
			};*/
		}]);
/*<<<<<<<<<<<<<<<<Hasta aqui>>>>>>>>>>>>>>>>*/

amigosControllers.controller('amigoNewCtrl', ['$scope','$rootScope','$routeParams', 'amigoSrv',
	function($scope,$rootScope,$routeParams,amigoSrv){
		$scope.amigo={nombre:"",tlfno:""};
		$scope.guardar=function() {
			if ($scope.amigo.nombre!="") {
				amigoSrv.add($scope.amigo);
			}
		}
}]);