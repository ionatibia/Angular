var app = angular.module("app");
app.controller('DispensaCtrl', ['$scope','$location', function ($scope,$location) {
	if (!$scope.checkLogin()){
		$location.path("/");
	}

}])//controller