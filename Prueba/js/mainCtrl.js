var app = angular.module("app");
app.controller('MainCtrl', ['$scope','menuService', function ($scope,menuService) {
	menuService.collapseMenu();
	$scope.submit = function (user) {
		alert(JSON.stringify(user))
	}
}])