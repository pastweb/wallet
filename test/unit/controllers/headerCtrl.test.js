'use strict';

describe('headerCtrl', function(){
	var scope, rootScope;

	beforeEach(inject(function ($rootScope){
		scope = $rootScope.$new();
		rootScope = $rootScope.$new();

		scope.resetStorage = function(){
			$rootScope.$emit('resetEvent');
		};
	}));

	it('test resetStorage method', function ($controller){
		var controller = $controller('headerCtrl', {$scope: scope});
		spyOn(rootScope, '$emit');

		expect($scope.resetStorage).not.toBeNull();
    	expect($scope.resetStorage).toBeDefined();
    	expect($scope.resetStorage).not.toThrow();
    	expect(rootScope.$emit).toHaveBeenCalledWith('resetEvent');
    	scope.resetStorage();
	});
});