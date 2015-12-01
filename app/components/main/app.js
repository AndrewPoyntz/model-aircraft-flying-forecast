/**
 * Created by Andrew on 11/14/2015.
 */
var app = angular.module('main', ['ngAria','ngAnimate','forecast','preferences']);
app.controller('mainCtrl', function ($scope, $rootScope){
	'use strict';
	$rootScope.appTitle = 'Model Aircraft Flying Forecast';
	$scope.showPreferences = function () {
		$rootScope.$broadcast('showHidePreferences',true);
	};
});
