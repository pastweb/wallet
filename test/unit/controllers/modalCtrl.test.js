'use strict';
describe('modalCtrl', function(){
	var scope, rootScope, controller, timeout;

	beforeEach(function(){
		module('myApp');
	});

	beforeEach(inject(function ($rootScope, $controller, $timeout){
		scope = $rootScope.$new();
		rootScope = $rootScope.$new();
		timeout = $timeout;
		controller = $controller('modalCtrl', {$scope: scope});

		scope.modalMessage = '';
		scope.modalClass = 'app_modal hide_element';

		rootScope.$on('openModal', function(event, data){
  			scope.modalMessage = data.message;
  			scope.modalClass = 'app_modal show_element fade_in';
  		});

  		scope.close = function() {
  			scope.modalClass = 'app_modal fade_out';
  			$timeout(function(){
  				scope.modalClass = 'app_modal hide_element';
  			}, 700);
  		};

	}));

	it('test modalMessage default value, should be an empty string',function(){
		expect(scope.modalClass).toBe('app_modal hide_element');
	});

	it('test modalClass default value, should be "app_modal hide_element"',function(){
		expect(scope.modalMessage).toBe('');
	});

	it('test on openModal Event', function(){
		var modalMessage = {message: 'some text message'};
		rootScope.$emit('openModal', modalMessage);
		expect(scope.modalMessage).toBe(modalMessage.message);
  		expect(scope.modalClass).toBe('app_modal show_element fade_in');
	});

	it('test close method', function(){
		scope.close();
		expect(scope.modalClass).toBe('app_modal fade_out');
		timeout.flush();
		expect(scope.modalClass).toBe('app_modal hide_element');
	});
});