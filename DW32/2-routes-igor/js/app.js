var amigoApp = angular.module('amigoApp', [
  'ngRoute',
  'amigosControllers'  
]);

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
