/* globals describe, it, expect, beforeEach, module, inject, spyOn, jasmine */
describe('forecast', function () {
	'use strict';
	var scope,
		controller,
		rootScope,
		fakeForecastFactory,
		fakePreferencesFactory;
	fakeForecastFactory = {
		getForecastData: jasmine.createSpy(),
		getLocations: jasmine.createSpy(),
		reSortData: jasmine.createSpy()
	};
	fakePreferencesFactory = {
		setSelectedAircraft: jasmine.createSpy().and.callThrough(),
		getPreferences: jasmine.createSpy().and.returnValue({
			timesteps: {"0": false, "3": false, "6": false, "9": false, "12": false, "15": true, "18": true, "21": true},
			aircraft:[{
				name: 'Club Defaults',
				thresholds: {
					windSpeed: 10,
					precipProb: 20,
					visibility: 4
				}
			},{
				name:'customAircraft',
				thresholds:{
					windSpeed: 15,
					precipProb: 25,
					visibility:1
				}
			}],
			selectedAircraft: 0
		})
	};
	beforeEach(function () {
		module('main');
		module('forecast', function ($provide){
			$provide.value('ForecastFactory', fakeForecastFactory);
			$provide.value('PreferencesFactory', fakePreferencesFactory);
		});
		inject(function ($controller, $rootScope){
			rootScope = $rootScope;
			spyOn(rootScope, '$broadcast').and.callThrough();
			spyOn(rootScope, '$on').and.callThrough();
			scope = $rootScope.$new();
			controller = $controller('ForecastCtrl', {
				$scope: scope
			});
			scope.vm = controller;
		});
	});
	describe('Forecast controller tests', function () {
		it('Should be defined', function () {
			expect(controller).toBeDefined();
		});
		it('Should call the factory to get the forecast data when getForecastData is called', function (){
			scope.getForecastData();
			expect(fakeForecastFactory.getForecastData).toHaveBeenCalled();
		});
		it('Should call the factory to resort the data preferencesChanged is broadcast', function (){
			rootScope.$broadcast('preferencesChanged');
			expect(fakeForecastFactory.reSortData).toHaveBeenCalled();
		});
		it('Should update currentAircraftThresholds and call setSelectedAircraft & reSortData in the factory when currentAircraft changes', function () {
			// set things up
			scope.$apply();
			// change the aircraft
			scope.currentAircraft = {
				name:'customAircraft',
				thresholds:{
					windSpeed: 15,
					precipProb: 25,
					visibility:1
				}
			};
			scope.$apply();
			expect(scope.currentAircraftThresholds).toEqual({windSpeed: '15mph',precipProb: '25%', visibility: {value: 1, text: 'Very poor (Less than 1 km)'}});
			expect(fakePreferencesFactory.setSelectedAircraft).toHaveBeenCalled();
			expect(fakeForecastFactory.reSortData).toHaveBeenCalled();
		});
	});
});

