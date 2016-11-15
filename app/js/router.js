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
			templateUrl : 'pages/createEvent.html'
		})
		.otherwise('/about');
	});
