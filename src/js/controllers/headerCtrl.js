'use strict';

app.controller('headerCtrl',['$scope', '$rootScope', function($scope, $rootScope){
	$scope.resetStorage = function(){
		$rootScope.$emit('resetEvent');
	}
}]);