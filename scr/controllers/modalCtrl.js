'use strict';

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

}]);