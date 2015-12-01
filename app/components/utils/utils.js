/**
 * Created by Andrew on 11/15/2015.
 */
/* globals app */

app.factory('utils', function () {
	'use strict';
	var i,
		visibilityObject = [
			{value: 0, text: 'Unknown'},
			{value: 1, text: 'Very poor (Less than 1 km)'},
			{value: 2, text: 'Poor (1-4 km)'},
			{value: 3, text: 'Moderate (4-10 km)'},
			{value: 4, text: 'Good (10-20 km)'},
			{value: 5, text: 'Very good (20-40 km)'},
			{value: 6, text: 'Excellent (40+ km)'}
		],
		visibilityOptions = angular.copy(visibilityObject),// visibility form options
		windSpeedOptions = [], // wind speed form options
		precipOptions = []; // precip probability form options
	visibilityOptions.shift(); // we don't want 'unknown' to appear in the form dropdowns
	for (i = 0; i <= 60; i++) {
		windSpeedOptions.push({value: i, text: i + 'mph'});
	}
	for (i = 0; i <= 100; i += 5) {
		precipOptions.push({value: i, text: i + '%'});
	}
	return {
		visibilityOptions: visibilityOptions,
		windSpeedOptions: windSpeedOptions,
		precipOptions: precipOptions,
		/**
		 * converts given XML into a JSON object
		 * @param xml {string}
		 * @returns {object}
		 */
		xmlToJson: function (xml) {
			var x2js = new X2JS({emptyNodeForm: 'object', attributePrefix: ''});
			return x2js.xml_str2json(xml.toString());
		},
		/**
		 * takes the raw visibility value from the datafeed and converts it to a more readable form
		 * @param value {string}
		 * @returns {object}
		 */
		rawVisibilityToText: function (value) {
			switch (value) {
				case 'EX':
					return visibilityObject[6];
				case 'VG':
					return visibilityObject[5];
				case 'GO':
					return visibilityObject[4];
				case 'MO':
					return visibilityObject[3];
				case 'PO':
					return visibilityObject[2];
				case 'VP':
					return visibilityObject[1];
				default:
				case 'UN':
					return visibilityObject[0];
			}
		},
		/**
		 * takes the numeric value of the visibility & returns the associated object
		 * @param value
		 * @returns {{value, text}}
		 */
		visibilityToText: function (value) {
			switch (value) {
				case 6:
					return visibilityObject[6];
				case 5:
					return visibilityObject[5];
				case 4:
					return visibilityObject[4];
				case 3:
					return visibilityObject[3];
				case 2:
					return visibilityObject[2];
				case 1:
					return visibilityObject[1];
				default:
					return visibilityObject[0];
			}
		}
	};
});