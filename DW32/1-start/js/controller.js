var app = angular.module("MiApp",[]);
app.controller("MiCont",["$scope","$http",function($scope,$http){
	$scope.nombres=[{nombre:"juan"},{nombre:"pepe"},{nombre:"otro"},{nombre:"otromas"}];
	$scope.nombre="juan";
	$scope.actualizarNombre=function() {
		$scope.saludo="Hola "+$scope.nombre;
		$scope.nombres.push({nombre:$scope.nombre});
	}

	$http({
	    method: 'JSONP',
	    url: 'http://api.flickr.com/services/feeds/photos_public.gne',
	    params: {
	      	'format': 'json',
	     	'jsoncallback': 'JSON_CALLBACK',
			'tagmode':'any',
			'tags':'zurriola'
	    }
  	}).success(function(photos) {
    console.log(photos);
    $scope.fotos=photos.items;
  
	});

}]);

