var amigoApp = angular.module('amigoApp', [
  'ngRoute',
  'amigosControllers',
  'firebase'
]);

//*************************************************************************
//inicio otra prueba pouchdb
amigoApp.factory('myPouch', [function() {

  var mydb = new PouchDB('ng-pouch');
  PouchDB.replicate('ng-pouch', 'https://ibeaumont.cloudant.com/amigos', {continuous: true});
  PouchDB.replicate('https://ibeaumont.cloudant.com/amigos', 'ng-pouch', {continuous: true});
  return mydb;

}]);

amigoApp.factory('util', ['$q', '$rootScope',
    function($q, $rootScope) {
      return {
        resolve: function(value) {
          $rootScope.$apply(function() {
            return $q.when(value);
          });
        },
        reject: function(error) {
          $rootScope.$apply(function() {
            return $q.reject(error);
          });
        }
      };
  }]);

amigoApp.factory('amigosSrv3', ['$rootScope','myPouch', 'util',
    function($rootScope, myPouch, util) {
      var lstAmigos = [];

      myPouch.changes({ live: true })
        .on('change', function handleUpdate(change) {

          if (!change.deleted) {
            console.log(change);
            myPouch.get(change.id).then(function(amigo) {
              //$rootScope.$apply(function() {
                //prueba igor
                var i;
                for (i = 0; i < lstAmigos.length; ++i) {
                  if (lstAmigos[i]._id === change.id) {
                    $rootScope.$apply(function() {
                      lstAmigos[i]=amigo;
                    });
                    break;
                  }
                } 
                //finprueba igor
                if (i==lstAmigos.length){
                  $rootScope.$apply(function() {
                    lstAmigos.push(amigo);
                  });
                }
              //});
            }, function(err) {
              console.log(err);
            });
          } else {
            for (var i = 0; i < lstAmigos.length; ++i) {
              if (lstAmigos[i]._id === change.id) {
                $rootScope.$apply(function() {
                  lstAmigos.splice(i, 1);
                });
                break;
              }
            }
          }
      });

      return {
        lstAmigos: lstAmigos,
        add: function(amigo) {
          return myPouch.post(amigo).then(util.resolve)
            .catch(util.reject);
        },
        get:function(id){
          return lstAmigos[id];
        },
        save:function(amigo){
          return myPouch.get(amigo._id)
            .then(function(doc) {
              return myPouch.put(amigo, amigo._id, doc._rev)
                .then(util.resolve, util.reject);
            })
            .catch(util.reject);
          
        },
        remove: function(id) {
          return myPouch.get(lstAmigos[id]._id)
            .then(function(doc) {
              return myPouch.remove(doc)
                .then(util.resolve, util.reject);
            })
            .catch(util.reject);
        }
      };
  }]);
  
  amigoApp.controller('amigosCtrl3', ['$scope', 'amigosSrv3',
    function($scope, amigosSrv3) {

      $scope.amigos = amigosSrv3.lstAmigos;

      $scope.guardar = function() {
        if ($scope.amigo.nombre !== '')
          amigosSrv3.add($scope.amigo).then(function(res) {
            //$scope.text = '';
          })
          .catch(function(reason) {
            console.log(reason);
          });
      };

      $scope.askDelete = function(amigo) {
        amigosSrv3.remove(amigo)
        .catch(function(reason) {
          console.log(reason);
        });
      };

  }]);
  
  amigoApp.controller('amigosEditCtrl3', ['$scope', 'amigosSrv3','$routeParams',
    function($scope, amigosSrv3,$routeParams) {

      $scope.amigo=amigosSrv3.get($routeParams.amigoId)
      $scope.guardar = function() {
        if ($scope.amigo.nombre !== '')
          amigosSrv3.save($scope.amigo).then(function(res) {
            //$scope.text = '';
          })
          .catch(function(reason) {
            console.log(reason);
          });
      };

      $scope.askDelete = function() {
        amigosSrv3.remove($routeParams.amigoId)
        .catch(function(reason) {
          console.log(reason);
        });
      };

  }]);
  
  amigoApp.controller('amigosNuevoCtrl3', ['$scope', 'amigosSrv3',
    function($scope, amigosSrv3) {

      $scope.amigo={nombre:"",tlfno:""};

      $scope.guardar = function() {
        if ($scope.amigo.nombre !== '')
          amigosSrv3.add($scope.amigo).then(function(res) {
            //$scope.text = '';
          })
          .catch(function(reason) {
            console.log(reason);
          });
      };

      $scope.askDelete = function(amigo) {
        amigosSrv3.remove(amigo)
        .catch(function(reason) {
          console.log(reason);
        });
      };

  }]);
//fin otra prueba pouchdb
//*************************************************************************


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
  var ref = new Firebase("https://astigarraga.firebaseio.com");
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
