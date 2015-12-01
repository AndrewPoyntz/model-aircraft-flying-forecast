/**
 * Created by Andrew on 11/16/2015.
 */
/* globals preferences */
preferences.factory('PreferencesFactory', ['$cookies',
	function ($cookies) {
		"use strict";
		/**
		 * the default preference object, this is set as a cookie, if the user has never been to the site before
		 * @type {{timesteps: {0: boolean, 3: boolean, 6: boolean, 9: boolean, 12: boolean, 15: boolean, 18: boolean, 21: boolean}, aircraft: array, selectedAircraft: number}}
		 */
		var defaults = {
				timesteps: {"0": false, "3": false, "6": false, "9": false, "12": false, "15": true, "18": true, "21": true},
				aircraft:[{
					name: 'Club Defaults',
					thresholds: {
						windSpeed: 10,
						precipProb: 20,
						visibility: 4
					}
				}],
				selectedAircraft: 0
			},
			/**
			 * holds the actual user preferences once loaded
			 * @type {object}
			 */
			prefs = null,
			/**
			 * load the users preference from the cookie,
			 * if they don't have one, set a new cookie & preferences using the defaults
			 */
			loadPreferences = function () {
				var preferenceCookie = $cookies.getObject('preferencesMAFF');
				if (angular.isObject(preferenceCookie)) {
					setPreferences(preferenceCookie);
				} else {
					setPreferences(angular.copy(defaults));
					saveToCookie();
				}
			},
			/**
			 * returns the users preferences
			 * @returns {Object}
			 */
			getPreferences = function () {
				return prefs;
			},
			/**
			 * returns the default aircraft thresholds (used in creating new aircraft)
			 * @returns {thresholds|{windSpeed, precipProb, visibility}|*}
			 */
			getDefaultThresholds = function () {
				return defaults.aircraft[0].thresholds;
			},
			/**
			 * set the user preferences to the passed in value & save it to the cookie
			 * @param {object} value
			 */
			setPreferences = function (value) {
				prefs = value;
				saveToCookie();
			},
			/**
			 * returns the index of the currently selected aircraft
			 * @returns {number|*}
			 */
			getSelectedAircraft = function (){
				return prefs.selectedAircraft;
			},
			/**
			 * sets the array index of the currently selected aircraft & saves it to the cookie
			 * @param value
			 */
			setSelectedAircraft = function (value){
				prefs.selectedAircraft =  value;
				saveToCookie();
			},
			/**
			 * saves the current user preferences into the cookie, with an expiry date of now +1 year
			 */
			saveToCookie = function () {
				$cookies.putObject('preferencesMAFF', getPreferences(), {expires: Date.create().addYears(1)});
			},
			/**
			 * Given forecast data, return a true/false, go/no-go based on the users thresholds
			 * @param data {object}
			 * @returns {boolean}
			 */
			isThresholdBreached = function (data) {
				var thresholds = prefs.aircraft[prefs.selectedAircraft].thresholds;
				return (data.wind.speed <= thresholds.windSpeed) &&
					(data.visibility.value >= thresholds.visibility) &&
					(data.precipProb <= thresholds.precipProb);
			},
			/**
			 * given a time, return a true false based on whether the user is interested in that timestep.
			 * @param time
			 * @returns {boolean}
			 */
			isUserPrefTime = function (time) {
				return prefs.timesteps[time.format('{H}')];
			};

		return {
			loadPreferences: loadPreferences,
			getPreferences: getPreferences,
			getDefaultThresholds: getDefaultThresholds,
			setPreferences: setPreferences,
			getSelectedAircraft: getSelectedAircraft,
			setSelectedAircraft: setSelectedAircraft,
			isThresholdBreached: isThresholdBreached,
			isUserPrefTime: isUserPrefTime
		};
	}
]);