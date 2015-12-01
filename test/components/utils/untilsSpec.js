/* globals describe, it, expect, beforeEach, module, inject, spyOn, jasmine */
describe('utils', function () {
	'use strict';
	var utils;
	beforeEach(function () {
		module('main');
	});
	beforeEach(inject(function(_utils_){
		utils = _utils_;
	}));
	describe('Utils factory tests', function () {
		it('Should return the correct values from rawVisibilityToText', function () {
			expect(utils.rawVisibilityToText('EX')).toEqual({value: 6, text: 'Excellent (40+ km)'});
			expect(utils.rawVisibilityToText('MO')).toEqual({value: 3, text: 'Moderate (4-10 km)'});
		});
		it('Should return the correct values from visibilityToText', function () {
			expect(utils.visibilityToText(0)).toEqual({value: 0, text: 'Unknown'});
			expect(utils.visibilityToText(1)).toEqual({value: 1, text: 'Very poor (Less than 1 km)'});
			expect(utils.visibilityToText(2)).toEqual({value: 2, text: 'Poor (1-4 km)'});
			expect(utils.visibilityToText(3)).toEqual({value: 3, text: 'Moderate (4-10 km)'});
			expect(utils.visibilityToText(4)).toEqual({value: 4, text: 'Good (10-20 km)'});
			expect(utils.visibilityToText(5)).toEqual({value: 5, text: 'Very good (20-40 km)'});
			expect(utils.visibilityToText(6)).toEqual({value: 6, text: 'Excellent (40+ km)'});
		});
	});
});

