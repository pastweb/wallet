'use strict';

var app = angular.module('myApp',['ui.router', 'ngStorage', 'angularModalService']);

app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('index',{
			url: "/",
			views: {
				"app_header": {templateUrl: "partials/header.html"},
				"app_container": {templateUrl: "partials/home.html"}
			} 
		})
		.state('info',{
			url: "/info",
			views: {
				"app_header": {templateUrl: "partials/header.html"},
				"app_container": {templateUrl: "partials/info.html"}
			}
		})
});
