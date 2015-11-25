var amigoApp = angular.module('amigoApp', [
  'ngRoute',
  'amigosControllers'  
]);

//Servicio para acceder a los datos de los amigos
amigoApp.factory('amigoSrv',function () {
  //el contenido de controller.js a esta funcion
  //controlador para el index
  var lstAmigos = [
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
  return {
    //funcion para recuperar toda la lista de amigos
    get:function () {
      return lstAmigos;
    },
    //funcion para buscar amigo
    find:function (id) {
      return lstAmigos[id];
    },
    //funcion para añadir amigo
    add:function (amigo) {
      lstAmigos.push(amigo);
    },
    //funcion para eliminar amigo
    delete:function (id) {
      lstAmigos.splice(id,1);
    }
  };
});
amigoApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/amigos', {
        templateUrl: 'amigos.html',
        controller: 'amigosCtrl'
      }).
      when('/amigo/:amigoId', {
        templateUrl: 'amigoEdit.html',
        controller: 'amigoEditCtrl'
      }).
      when('/nuevo', {
        templateUrl: 'amigoEdit.html',
        controller: 'amigoNewCtrl'
      }).
      otherwise({
        redirectTo: '/amigos'
      });
      
  }]);
