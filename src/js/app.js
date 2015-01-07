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
