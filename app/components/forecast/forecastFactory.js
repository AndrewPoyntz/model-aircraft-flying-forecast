/**
 * Created by Andrew on 11/15/2015.
 */
/* globals forecast */
forecast.factory('ForecastFactory', ['ServiceURLs', 'ForecastService', 'PreferencesFactory', 'utils',
	function (ServiceURLs, ForecastService, PreferencesFactory, utils) {
		'use strict';
		/**
		 * array containing the forecast locations, & forecast data once it's been retrieved
		 * @type {array}
		 */
		var locations = [{
				name: 'Aberporth',
				data: false,
				rawData: false,
				dataURL: ServiceURLs.aberporth,
				open: false
			}, {
				name: 'Capelcurig',
				data: false,
				rawData: false,
				dataURL: ServiceURLs.capelcurig,
				open: false
			}, {
				name: 'Rhyl',
				data: false,
				rawData: false,
				dataURL: ServiceURLs.rhyl,
				open: false
			}],
			/**
			 * given a location, calls the service to get the forecast data
			 * @param location {object}
			 */
			getForecast = function (location) {
				ForecastService.getForecast(location.dataURL).then(function (data) {
					location.rawData = data;
					location.data = sortForecastData(data);
				});
			},
			/**
			 * given a forecast object (xml datafeed->json), sort it into a more usable format
			 * & filter based on the current aircraft thresholds and timesteps
			 * @param data {object}
			 */
			sortForecastData = function (data) {
				var i, j, dv, forecastData, periods, period, day, dayDate, timeStep, timeStepObject, timeStepTime;
				forecastData = {};
				dv = data.SiteRep.DV;
				forecastData.issuedTime = Date.create(dv._dataDate).format('{HH}:{mm} on {dd}/{MM}/{yyyy}');
				forecastData.days = [];
				periods = dv.Location.Period;
				for (i = 0; i < periods.length; i++) {
					period = periods[i];
					day = {};
					// get a date object for the period
					// it's not actually a valid ISO8601 format as there's no timestamp, but there is a Z,
					// so strip the Z off the end, & trust it as UTC
					dayDate = Date.utc.create(period._value.replace('Z', ''));
					day.date = dayDate.format('{Weekday} {ord} {Mon}');
					day.timesteps = [];
					//loop through the timesteps
					for (j = 0; j < period.Rep.length; j++) {
						timeStep = period.Rep[j];
						timeStepObject = {};
						timeStepTime = Date.create(dayDate).addMinutes(timeStep.__text);
						timeStepObject.show = PreferencesFactory.isUserPrefTime(timeStepTime);
						if (timeStepObject.show) { // only do more work if the user actually wants this timestep!
							timeStepObject.wind = {
								speed: parseInt(timeStep._S, 10),
								direction: timeStep._D,
								gust: parseInt(timeStep._G, 10) // not currently used, additional enhancement I didn't have time for.
							};
							timeStepObject.precipProb = parseInt(timeStep._Pp, 10);
							timeStepObject.visibility = utils.rawVisibilityToText(timeStep._V);
							timeStepObject.time = timeStepTime.format('{h}{tt}');
							timeStepObject.status = PreferencesFactory.isThresholdBreached(timeStepObject);
							day.timesteps.push(timeStepObject);
						}
					}
					forecastData.days.push(day);
				}
				return forecastData;
			},
			/**
			 * loops through all the locations held in this factory, getting & sorting the forecast data
			 */
			getForecastData = function () {
				for (var i = 0; i < locations.length; i++) {
					getForecast(locations[i]);
				}
			},
			/**
			 * returns the array of locations
			 * @returns locations
			 */
			getLocations = function () {
				return locations;
			},
			/**
			 * re-sorts the forecast data, this would happen when the users preferences are updated
			 * (not overly happy with this, as re-sorting the raw data is not too efficient, but it's pretty quick)
			 */
			reSortData = function () {
				var i, location;
				for (i = 0; i < locations.length; i++) {
					location = locations[i];
					if (angular.isObject(location.rawData.SiteRep)) {
						location.data = sortForecastData(location.rawData);
					}
				}
			};

		/**
		 * "public" methods
		 */
		return {
			getForecastData: getForecastData,
			getLocations: getLocations,
			reSortData: reSortData
		};
	}
]);