/**
 * Created by Andrew on 11/16/2015.
 */
var preferences = angular.module('preferences', ['ngCookies']);

preferences.directive('preferences', function () {
	"use strict";
	return {
		restrict: 'E',
		templateUrl: 'components/preferences/preferences.html'
	};
});
preferences.controller('PreferencesCtrl', ['$scope', '$rootScope', 'PreferencesFactory', 'utils',
	function ($scope, $rootScope, PreferencesFactory, utils) {
		"use strict";
		var editAircraftIndex = null;
		$scope.prefsShown = false;
		$scope.prefTitle = 'User Preferences';
		$scope.userPreferences = false;
		/**
		 * ngModel for the add aircraft form, gets the default thresholds from the preference factory
		 * @type {{thresholds}}
		 */
		$scope.newAircraft = {thresholds: PreferencesFactory.getDefaultThresholds()};
		$scope.windSpeedOptions = utils.windSpeedOptions;
		$scope.precipOptions = utils.precipOptions;
		$scope.visibilityOptions = utils.visibilityOptions;
		$scope.createFormShown = false;
		$scope.editFormShown = false;

		/**
		 * calls the factory to load the preferences from the cookie
		 */
		$scope.getUserPrefs = function () {
			PreferencesFactory.loadPreferences();
		};

		/**
		 * listen for event to open the settings panel (main app controller fires this)
		 */
		$scope.$on('showHidePreferences', function (event, value) {
			$scope.prefsShown = value;
		});

		//watch for changes in the factory, & set the scope var to match
		$scope.$watch(PreferencesFactory.getPreferences, function (newVal) {
			$scope.userPreferences = angular.copy(newVal);
		});

		/**
		 * show the create aircraft form
		 */
		$scope.createAircraft = function () {
			$scope.createFormShown = true;
		};
		/**
		 * on clicking add, push the new aircraft into the preferences & then call the factory to save it.
		 */
		$scope.addAircraft = function () {
			$scope.userPreferences.aircraft.push(angular.copy($scope.newAircraft));
			PreferencesFactory.setPreferences($scope.userPreferences);
			$scope.createFormShown = false;
		};
		/**
		 * hide the create aircraft form (usually called from the cancel button)
		 */
		$scope.cancelNewAircraft = function () {
			$scope.createFormShown = false;
		};
		/**
		 * show the edit aircraft form, populating scope.editAircraftDetail with the appropriate
		 * details to be used as the ngModel in the form
		 * @param index {number} aircraft array position for editing
		 */
		$scope.editAircraft = function (index) {
			var aircraft = $scope.userPreferences.aircraft[index];
			$scope.editAircraftDetail = angular.copy(aircraft);
			editAircraftIndex = index;
			$scope.editFormShown = true;
		};
		/**
		 * on submitting the edit aircraft form, update the aircraft in the preferences & call the factory to save it.
		 */
		$scope.updateAircraft = function () {
			$scope.userPreferences.aircraft[editAircraftIndex] = $scope.editAircraftDetail;
			PreferencesFactory.setPreferences($scope.userPreferences);
			$scope.editFormShown = false;
		};
		/**
		 * hide the edit aircraft form
		 */
		$scope.cancelEditAircraft = function () {
			$scope.editFormShown = false;
		};
		/**
		 * on clicking the delete aircraft button, confirm to the user that they wanted to do it, if so
		 * remove it from the preferences object and call the factory to save the change to the cookie
		 * @param index {number} array position of the aircraft to be deleted
		 */
		$scope.deleteAircraft = function (index) {
			var aircraft = $scope.userPreferences.aircraft[index];
			if (index !== 0) { // we don't want to inadvertently delete the "club defaults" (shouldn't be possible)
				if (window.confirm('Are you sure you want to delete ' + aircraft.name + '?')) {
					$scope.userPreferences.aircraft.splice(index, 1);
					PreferencesFactory.setPreferences($scope.userPreferences);
				} else {
					return false;
				}
			}
		};
		/**
		 * closes the settings panel & calls the factory to save any unsaved changes to the cookie (i.e. selected times)
		 */
		$scope.closePrefs = function () {
			// closing the panel, save any preference changes (i.e. timesteps) & close any aircraft edit forms
			PreferencesFactory.setPreferences($scope.userPreferences);
			$scope.prefsShown = false;
			$scope.createFormShown = false;
			$scope.editFormShown = false;
			// announce the preferences have changed
			$rootScope.$broadcast('preferencesChanged');
			return false;
		};
	}
]);