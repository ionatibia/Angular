angular
    .module('apiApp', [])
    .controller('apiAppCtrl', controladorPrincipal);

function controladorPrincipal($scope, $http){
    var vm=this;

    vm.orden = false;
    vm.campo = "title";
    
    var url = "http://jsonplaceholder.typicode.com/posts?callback=JSON_CALLBACK";
    if(vm.nombre){
        url += "&query=" + vm.nombre
    }
    vm.buscaCervezas = function(){
        $http.jsonp(url).success(function(respuesta){
            console.log("res:", respuesta);
            vm.cervezas = respuesta;
        });
    }
}