 angular.module('app')


    .factory('SociosServ', ['$http', function ($http) {

        var endpoint = 'localhost/users';

        var token = "99KI9Gj68CgCf70deM22Ka64chef2C40Gm2lFJ2J0G9JkD0bFAcbFfd19MfacGf3FFm8CM1hG0eDiIk8";
        var credencial = "rm@w.com.br:cd87cd5ef753a06ee79fc75ds7cfe66c";
        var origem = "mobile";


         var config = {
        url: endpoint,
        method: 'GET',
        headers: {
            'X-API-TOKEN': token,
            'X-API-CREDENCIAL': credencial,
            'X-API-ORIGEM': origem
        }
    };


    return {

        getAll: function () {
            return $http(config);
        }
 }];