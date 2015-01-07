'use strict';

app.controller('homeCtrl', ['$scope', '$localStorage', '$rootScope', function($scope, $localStorage, $rootScope){

	$scope.$storage = $localStorage.$default({balance: 0, operations : []});

	$scope.getDateTime = function(){
		var dateTime = new Date();
		dateTime = dateTime.getDate()+'/'+(dateTime.getMonth()+1)+'/'+dateTime.getFullYear()+' '+dateTime.getHours()+':'+dateTime.getMinutes()+':'+dateTime.getSeconds();
		return dateTime;
	}

	$scope.amount = 0;
	$scope.lastUpdate = $scope.getDateTime();
	$scope.inputClass = 'form-control';

	$scope.showModal = function(customMessage){
		var message = {message: customMessage};
		$rootScope.$emit('openModal', message);
  	};

	$scope.addValue = function(){
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

	$scope.rmValue = function(){
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

	$scope.cleanField = function(){
		$scope.amount = '';
	}

	$scope.setBGItem = function(symbol){
		var settings = {};
		if(symbol == '-'){
			settings.class = 'negative';
			settings.icon = 'fa fa-minus';
		}else{
			settings.class = 'positive';
			settings.icon = 'fa fa-plus';
		}
		return settings;
	}


	$rootScope.$on('resetEvent', function(){
		$scope.$storage.balance = 0;
		$scope.$storage.operations = [];
	});

	
}]);