var app = angular.module('teamformApp', ['ngRoute']);
	app.config(function($routeProvider) {
		$routeProvider
	
		//route for the home page
		.when('/about', {
			templateUrl : 'pages/main.html'
		})
		
		.when('/login', {
			templateUrl : 'pages/createProfile.html',
			resolve: {
            login: function(loginService) {
              return loginService.login();
            },
			updateUser: function(loginService) {
			  return loginService.updateUser();
            }
          }
		
		})

			.when('/logout', {
				templateUrl: 'pages/main.html',
				resolve: {
					logout: function (loginService) {
						return loginService.logout();
					}
				}

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
	})
