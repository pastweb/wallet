'use strict';

describe('homeCtrl', function(){

	var scope, rootScope, controller;

	beforeEach(function(){
		module('myApp');
	});

	beforeEach(inject(function ($rootScope, $localStorage, $controller){
		rootScope = $rootScope.$new();
		scope = $rootScope.$new();
		controller = $controller('homeCtrl', {$scope: scope, $rootScope: rootScope});

		scope.$storage = {balance: 0, operations : []};
		scope.getDateTime = function(){
			var dateTime = new Date();
			dateTime = dateTime.getDay()+'/'+dateTime.getMonth()+'/'+dateTime.getFullYear()+' '+dateTime.getHours()+':'+dateTime.getMinutes()+':'+dateTime.getSeconds();
			return dateTime;
		};
		scope.amount = 0;
		scope.lastUpdate = scope.getDateTime();
		scope.inputClass = 'form-control';
		scope.modalMessage = '';

		scope.showModal = function(customMessage){
			var settings = {
				size: 'lg',
				backdrop: 'static',
				templateUrl: 'partials/modal.html',
				message: customMessage
			};
			rootScope.$emit('openModal', settings);
  		};

  		scope.addValue = function(){
			if(!isNaN(scope.amount)){
				if(scope.amount > 0){
					scope.$storage.balance += scope.amount;
					scope.$storage.operations.push({symbol: '+',amount: scope.amount, date: scope.getDateTime()});
					scope.lastUpdate = scope.getDateTime();
					scope.cleanField();
				}
			}else{
				scope.showModal('the text is not a number');
			}
		};

		scope.rmValue = function(){
			if(!isNaN(scope.amount) && (scope.amount <= scope.storage.balance) && (scope.amount > 0)){
				scope.$storage.balance -= scope.amount;
				scope.storage.operations.push({symbol: '-',amount: scope.amount, date: scope.getDateTime()});
				scope.lastUpdate = scope.getDateTime();
				scope.cleanField();
			}else{
				var message = '';
				if( scope.amount > scope.$storage.balance ){
					message = 'the Amont value is greater that Balance.';
				}else
					message = 'the text is not a number';
				scope.showModal(message);
			}
		};

		scope.cleanField = function(){
			scope.amount = '';
		};

		scope.setBGItem = function(symbol){
			var settings = {};
			if(symbol == '-'){
				settings.class = 'negative';
				settings.icon = 'fa fa-minus';
			}else{
				settings.class = 'positive';
				settings.icon = 'fa fa-plus';
			}
			return settings;
		};

		rootScope.$on('resetEvent', function(){
			scope.$storage.balance = 0;
			scope.$storage.operations = [];
		});

		scope.resetData = function(){
			rootScope.$emit('resetEvent');
		}
	}));

	it('test the default localStorage variable', function(){
     	expect(scope.$storage).toBeDefined();
    	expect(scope.$storage.balance).toBe(0);
     	expect(scope.$storage.operations.length).toBe(0);
    });

    it('test the default amount variable', function(){
    	expect(scope.amount).toBeDefined();
    	expect(scope.amount).toEqual(0);
    });

    it('test the getDateTime method', function(){
    	expect(scope.getDateTime).not.toBeNull();
    	expect(scope.getDateTime).toBeDefined();
    	expect(scope.getDateTime).not.toThrow();

    	var lastUpdate = scope.getDateTime();
    	expect(lastUpdate).toBeDefined();
    });

    it('test the lastUpdate default value', function(){
    	expect(scope.lastUpdate).not.toBeNull();
    	expect(scope.lastUpdate).toBeDefined();
    });

    it('test the default inputClass variable', function(){
    	expect(scope.inputClass).toBe('form-control');
    });

    it('test the default modalMessage variable', function(){
    	expect(scope.modalMessage).toBe('');
    });

    it('test the showModal method', function(){
    	spyOn(rootScope,'$emit');

    	expect(scope.showModal).not.toBeNull();
    	expect(scope.showModal).toBeDefined();
    	expect(scope.showModal).not.toThrow();

    	var customMessage = 'some modal message';

    	scope.showModal(customMessage);

    	var settings = {
				size: 'lg',
				backdrop: 'static',
				templateUrl: 'partials/modal.html',
				message: customMessage
			};
		expect(rootScope.$emit).toHaveBeenCalledWith('openModal', settings);
    });

    it('test the addValue method', function(){
    	expect(scope.addValue).not.toBeNull();
    	expect(scope.addValue).toBeDefined();
    	expect(scope.addValue).not.toThrow();
    });

    it('test the cleanField method', function(){
    	expect(scope.cleanField).not.toBeNull();
    	expect(scope.cleanField).toBeDefined();
    	expect(scope.cleanField).not.toThrow();
    });

    it('test the setBGItem method', function(){
    	expect(scope.setBGItem).not.toBeNull();
    	expect(scope.setBGItem).toBeDefined();
    	expect(scope.setBGItem).not.toThrow();
    });

    it('test rootScope on resetEvent', function(){
    	spyOn(rootScope, '$on');

    	scope.resetData();
    	expect(rootScope.$on).toHaveBeenCalledWith('resetEvent');
    });
});