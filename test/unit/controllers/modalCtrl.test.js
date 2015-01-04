'use strict';
describe('modalCtrl', function(){
	var scope, rootScope;

	beforeEach(inject(function ($rootScope){
		scope = $rootScope.$new();
		rootScope = $rootScope;
	}));

	it('test on openModal Event', function ($controller){
		var controller = $controller('modalCtrl', {$scope: scope});
		spyOn(rootScope, '$on');

		var settings = {
				size: 'lg',
				backdrop: 'static',
				templateUrl: 'partials/modal.html',
				message: customMessage
			};
		expect(rootScope.$on).toHaveBeenCalledWith('openModal', settings);
	});
});

describe('modalInstanceCtrl', function(){
	var scope;

	beforeEach(inject(function($rootScope){
		scope = $rootScope.$new();
	}));

	it('test message variable', function ($controller){
		var controller = $controller('modalInstanceCtrl', {$scope: scope});
		var settings = {message: "some message"};
		$scope.message = settings.message;
		expect($scope.message).not.toBeNull();
		expect($scope.message).toBeDefined();
		expect($scope.message).toBe('some message');
	});
});