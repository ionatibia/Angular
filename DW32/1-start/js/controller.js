var app = angular.module("MiApp",[]);
app.controller("MiCont",["$scope","$http",function($scope,$http){
	$scope.nombres=[{nombre:"juan"},{nombre:"pepe"},{nombre:"otro"},{nombre:"otromas"}];
	$scope.nombre="";
	$scope.mostrarAlert=false;
	$scope.mostrarAlert2=false;
	$scope.actualizarNombre=function() {
		if ($scope.nombre == "") {
			$scope.mostrarAlert=true;
		}else{
			$scope.mostrarAlert=false;
			$scope.saludo="Fotos de "+$scope.nombre;
			$scope.nombres.push({nombre:$scope.nombre});
	

			$http({
			    method: 'JSONP',
			    url: 'https://api.flickr.com/services/feeds/photos_public.gne',
			    params: {
			      	'format': 'json',
			     	'jsoncallback': 'JSON_CALLBACK',
					'tagmode':'any',
					'tags':$scope.nombre
			    }
		  	})//http
		  	.success(function(photos) {
		    console.log(photos);
		    $scope.fotos=photos.items;
		    if (photos.items.length==0) {
		    	$scope.mostrarAlert2=true;
		    }else{
		    	$scope.mostrarAlert2=false;
		    }
			})//success
			.error(function () {
				$scope.mostrarAlert2=true;	
			});
		}//if
	}//funcion
}]);//controlador

