'use strict';

var app = angular.module('myApp',['ui.router', 'ngStorage']);

app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('index',{
			url: "/",
			views: {
				"app_modal": {templateUrl: "partials/modal.html"},
				"app_header": {templateUrl: "partials/header.html"},
				"app_container": {templateUrl: "partials/home.html"}
			} 
		})
		.state('info',{
			url: "/info",
			views: {
				"app_modal": {templateUrl: "partials/modal.html"},
				"app_header": {templateUrl: "partials/header.html"},
				"app_container": {templateUrl: "partials/info.html"}
			}
		})
}]);
;'use strict';

app.controller('headerCtrl',['$scope', '$rootScope', function($scope, $rootScope){
	$scope.resetStorage = function(){
		$rootScope.$emit('resetEvent');
	}
}]);;'use strict';

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

	
}]);;'use strict';

app.controller('modalCtrl', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {

  $scope.modalMessage = '';
  $scope.modalClass = 'app_modal hide_element';

  $rootScope.$on('openModal', function(event, data){
  	$scope.modalMessage = data.message;
  	$scope.modalClass = 'app_modal show_element fade_in';
  });
  
  $scope.close = function() {
  	$scope.modalClass = 'app_modal fade_out';
  	$timeout(function(){
  		$scope.modalClass = 'app_modal hide_element';
  	}, 700);
  };

}]);;'use strict';

app.directive('smartFloat', ['$filter', function($filter){
    var FLOAT_REGEXP_1 = /^\$?\d+(.\d{3})*(\,\d*)?$/; //Numbers like: 1.123,56
    var FLOAT_REGEXP_2 = /^\$?\d+(,\d{3})*(\.\d*)?$/; //Numbers like: 1,123.56
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                if (FLOAT_REGEXP_1.test(viewValue)) {
                    ctrl.$setValidity('float', true);
                    return parseFloat(viewValue.replace('.', '').replace(',', '.'));
                } else if (FLOAT_REGEXP_2.test(viewValue)) {
                        ctrl.$setValidity('float', true);
                        return parseFloat(viewValue.replace(',', ''));
                } else {
                    ctrl.$setValidity('float', false);
                    return undefined;
                }
            });
            ctrl.$formatters.unshift(
               function (modelValue) {
                   return $filter('number')(parseFloat(modelValue) , 2);
               }
           );
        }
    };
}]);