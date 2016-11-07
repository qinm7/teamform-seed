
angular.module('teamformApp', ['ngRoute'])
.config(function($routeProvider) {
	$routeProvider
	
		//route for the home page
		.when('/about', {
			templateUrl : 'pages/main.html'
		})
		
		.when('/how', {
			templateUrl : 'pages/createEvent.html'
		})
		
		.when('/events', {
			templateUrl : 'pages/createProfile.html'
		});
	});