'use strict';

angular.module('angularRestfulAuth')
	.controller('HomeCtrl', ['$rootScope','$scope','$location','$localStorage', 'Main', function ($rootScope,$scope,$location,$localStorage,Main) {
		$scope.token= null;
		$scope.signin = function () {
			var formData = {
				email: $scope.email,
				password: $scope.password
			}

			Main.signin(formData, function (res) {
				if (res.type == false) {
					alert(res.data)
				} else {
					$localStorage.token = res.token;
					$location.path("/")
				}
			}, function () {
				$rootScope.error = 'Failed'
			})
		}// signin

		$scope.logout = function () {
			Main.logout(function () {
				$location.url("/")
			},function () {
				alert('Failed logout')
			})
		}// logout
		$scope.token = $localStorage.token;
	}
])