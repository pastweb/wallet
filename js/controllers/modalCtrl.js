'use strict';

app.controller('modalCtrl', ['$scope', 'message', 'close', function($scope, message, close) {

  $scope.message = message;
  
  $scope.close = function(result) {
  	close(result, 500); // close, but give 500ms for bootstrap to animate
  };

}]);