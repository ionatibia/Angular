var amigoApp = angular.module('amigoApp', [
  'ngRoute',
  'amigosControllers',
  'firebase'
]);

//Servicio para acceder a los datos de los amigos
amigoApp.factory('amigoSrv',['$firebaseArray',function ($firebaseArray) {
  //el contenido de controller.js a esta funcion
  //controlador para el index
  /*var lstAmigos = [
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
  ];*/
  var ref = new Firebase("https://froga.firebaseio.com");
  var lstAmigos=$firebaseArray(ref);
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
      //lstAmigos.push(amigo);
      lstAmigos.$add(amigo);
    },
    //funcion para eliminar amigo
    delete:function (id) {
      //lstAmigos.splice(id,1);
      lstAmigos.$remove(lstAmigos[id]);
    },
    save:function (id) {
      lstAmigos.$save(lstAmigos[id]);
    }
  };
}]);
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
