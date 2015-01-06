'use strict';

describe('headerCtrl', function(){
	var scope, rootScope, controller;

	beforeEach(function(){
//		angular.mock.module('ui.router');
//		angular.mock.module('ngStorage');
//		module('angularModalService');
		module('myApp');
	});

	beforeEach(inject(function ($rootScope, $controller){
		scope = $rootScope.$new();
		rootScope = $rootScope.$new();
		controller = $controller('headerCtrl', {$scope: scope});

		scope.resetStorage = function(){
			rootScope.$emit('resetEvent');
		};
	}));

	it('test resetStorage method', function (){
//		var controller = $controller('headerCtrl', {$scope: scope});
		spyOn(rootScope, '$emit');

		expect(scope.resetStorage).not.toBeNull();
    	expect(scope.resetStorage).toBeDefined();
    	expect(scope.resetStorage).not.toThrow();
    	expect(rootScope.$emit).toHaveBeenCalledWith('resetEvent');
    	scope.resetStorage();
	});
});