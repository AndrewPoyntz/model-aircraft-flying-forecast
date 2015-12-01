/**
 * Created by Andrew on 11/15/2015.
 */
forecast.service('ForecastService', ['$http','utils',
	function ($http, utils){
		'use strict';
		/**
		 * call off to the URL to get data, convert the XML to JSON before passing it back to the factory
		 * @param url
		 * @returns {object|boolean}
		 */
		this.getForecast = function (url) {
			return $http({
				method: 'GET',
				url: url
			}).then(function (response){
				var data = utils.xmlToJson(response.data);
				if (angular.isObject(data)) {
					return data;
				} else {
					return false;
				}
			});
		};
	}
]);