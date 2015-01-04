'use strict';

describe('homeCtrl', function(){

	var scope, rootScope;

	beforeEach(function(){
//		module('myApp');
		module('ngStorage');
//		module.mock('myApp');
	});

	beforeEach(inject(function ($rootScope, $localStorage){
		rootScope = $rootScope.$new();
		scope = $rootScope.$new();

		scope.$storage = $localStorage.$default({balance: 0, operations : []});
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
			$rootScope.$emit('openModal', settings);
  		};

  		scope.addValue = function(){
			if(!isNaN($scope.amount)){
				if($scope.amount > 0){
					$scope.$storage.balance += $scope.amount;
					$scope.$storage.operations.push({symbol: '+',amount: $scope.amount, date: $scope.getDateTime()});
					$scope.lastUpdate = $scope.getDateTime();
					$scope.cleanField();
				}
			}else{
				$scope.showModal('the text is not a number');
			}
		};

		scope.rmValue = function(){
			if(!isNaN($scope.amount) && ($scope.amount <= $scope.$storage.balance) && ($scope.amount > 0)){
				$scope.$storage.balance -= $scope.amount;
				$scope.$storage.operations.push({symbol: '-',amount: $scope.amount, date: $scope.getDateTime()});
				$scope.lastUpdate = $scope.getDateTime();
				$scope.cleanField();
			}else{
				var message = '';
				if( $scope.amount > $scope.$storage.balance ){
					message = 'the Amont value is greater that Balance.';
				}else
					message = 'the text is not a number';
				$scope.showModal(message);
			}
		};

		scope.cleanField = function(){
			$scope.amount = '';
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
	}));

	it('test the default localStorage variable', function ($controller) {
		var controller = $controller('homeCtrl', {$scope: scope});
      	expect($scope.$storage).toBeDefined();
      	expect($scope.$storage.balance).toBe(0);
      	expect($scope.$storage.operations).toBe([]);
    });

    it('test the default amount variable', function ($controller){
    	var controller = $controller('homeCtrl', {$scope: scope});
    	expect($scope.amount).toBeDefined();
    	expect($scope.amount).toEqual(0);
    });

    it('test the getDateTime method', function ($controller){
    	var controller = $controller('homeCtrl', {$scope: scope});
    	expect($scope.getDateTime).not.toBeNull();
    	expect($scope.getDateTime).toBeDefined();
    	expect($scope.getDateTime).not.toThrow();

    	var lastUpdate = scope.getDateTime();
    	expect(lastUpdate).toBeDefined();
    });

    it('test the lastUpdate default value', function ($controller){
    	var controller = $controller('homeCtrl', {$scope: scope});
    	expect($scope.lastUpdate).not.toBeNull();
    	expect($scope.lastUpdate).toBeDefined();
    });

    it('test the default inputClass variable', function ($controller){
    	var controller = $controller('homeCtrl', {$scope: scope});
    	expect($scope.inputClass).toBe('form-control');
    });

    it('test the default modalMessage variable', function ($controller){
    	var controller = $controller('homeCtrl', {$scope: scope});
    	expect($scope.modalMessage).toBe('');
    });

    it('test the showModal method', function ($controller){
    	var controller = $controller('homeCtrl', {$scope: scope});
    	spyOn(rootScope,'$emit');
    	expect($scope.showModal).not.toBeNull();
    	expect($scope.showModal).toBeDefined();
    	expect($scope.showModal).not.toThrow();

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

    it('test the addValue method', function ($controller){
    	var controller = $controller('homeCtrl', {$scope: scope});
    	expect($scope.addValue).not.toBeNull();
    	expect($scope.addValue).toBeDefined();
    	expect($scope.addValue).not.toThrow();
    });

    it('test the cleanField method', function ($controller){
    	var controller = $controller('homeCtrl', {$scope: scope});
    	expect($scope.cleanField).not.toBeNull();
    	expect($scope.cleanField).toBeDefined();
    	expect($scope.cleanField).not.toThrow();
    });

    it('test the setBGItem method', function ($controller){
    	var controller = $controller('homeCtrl', {$scope: scope});
    	expect($scope.setBGItem).not.toBeNull();
    	expect($scope.setBGItem).toBeDefined();
    	expect($scope.setBGItem).not.toThrow();
    });

    it('test rootScope on resetEvent', function ($controller){
    	var controller = $controller('homeCtrl', {$scope: scope});
    	spyOn(rootScope, '$on');
    	expect(rootScope.$on).toHaveBeenCalledWith('resetEvent');
    	rootScope.$emit('resetEvent');
    });
});