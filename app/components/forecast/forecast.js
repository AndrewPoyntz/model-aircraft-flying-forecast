/**
 * Created by Andrew on 11/15/2015.
 */
var forecast = angular.module('forecast', ['ngAnimate']);

forecast.directive('forecast', function () {
	"use strict";
	return {
		restrict: 'E',
		templateUrl: 'components/forecast/forecast.html'
	};
});
forecast.controller('ForecastCtrl', ['$scope', 'ForecastFactory', 'PreferencesFactory', 'utils',
	function ($scope, ForecastFactory, PreferencesFactory, utils) {
		"use strict";
		$scope.getForecastData = function () {
			ForecastFactory.getForecastData();
		};
		/**
		 * list of user aircraft, updated when prefs load
		 * @type {Array}
		 */
		$scope.aircraft = [];
		/**
		 * current aircraft object, populated when preferences load, & ngModel'd to the dropdown
		 * @type {object}
		 */
		$scope.currentAircraft = null;
		/**
		 * will contain a formatted version of the current aircraft's thresholds for display
		 * @type {object}
		 */
		$scope.currentAircraftThresholds = null;
		/**
		 * list of locations from the forecast factory, populated when the data loads
		 * @type {locations}
		 */
		$scope.forecastLocations = ForecastFactory.getLocations();
		// watch for data changes in the factory, update view variables as required.
		$scope.$watch(PreferencesFactory.getPreferences, function (newVal) {
			$scope.userPreferences = newVal;
			$scope.aircraft = newVal.aircraft;
			$scope.currentAircraft = $scope.aircraft[newVal.selectedAircraft];
		});
		// watch the currently selected aircraft, reSort the forecast data based on the new thresholds
		// & push the change back to the factory for saving to cookie.
		$scope.$watch('currentAircraft', function () {
			var i, aircraft;
			$scope.currentAircraftThresholds = {
				windSpeed: $scope.currentAircraft.thresholds.windSpeed + 'mph',
				precipProb: $scope.currentAircraft.thresholds.precipProb + '%',
				visibility: utils.visibilityToText($scope.currentAircraft.thresholds.visibility)
			};
			for (i = 0; i < $scope.aircraft.length; i++) {
				aircraft = $scope.aircraft[i];
				if (aircraft === $scope.currentAircraft) {
					PreferencesFactory.setSelectedAircraft(i);
				}
			}
			ForecastFactory.reSortData();
		});
		// listen for changes to the preferences, & re-sort the data when it does (effectively picks user choice of time steps)
		$scope.$on('preferencesChanged', function () {
			ForecastFactory.reSortData();
		});
	}
]);