var app = angular.module('teamformApp', ['ngRoute']);
	app.config(function($routeProvider) {
		$routeProvider
	
		//route for the home page
		.when('/about', {
			templateUrl : 'pages/main.html'
		})
		
		.when('/signup', {
			templateUrl : 'pages/createProfile.html'
		})
		
		.when('/events', {
			templateUrl : 'pages/event.html'
		})
		
		.when('/createEvent', {
			templateUrl : 'pages/createEvent.html'
		})
		
		.when('/eventSample', {
			templateUrl : 'pages/event_info.html'
		})
		
		.when('/adminEvent', {
			templateUrl : 'pages/event_admin.html'
		})
		.otherwise('/about');
	});