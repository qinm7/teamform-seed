var app = angular.module('teamformApp', ['ngRoute']);
app.config(function ($routeProvider) {
	$routeProvider

		//route for the home page
		.when('/about', {
			templateUrl: 'pages/main.html'
		})

		.when('/login', {
			templateUrl: 'pages/createProfile.html',
			resolve: {
				checkLogged: function (loginService, $location) {
					firebase.auth().onAuthStateChanged(function (user) {
					console.log("In the login I am " + loginService.isLoggedIn.get());
					if (loginService.isLoggedIn.get()) {
						console.log("I went there!");
						$location.path('/logintrue');
						console.log("I went there TWICE!");
					}
					else{
						$location.path('/events');
						
					}
					})
				}
			}

		})
		.when('/', {
			templateUrl: 'pages/main.html'
		})
		.when('/logintrue', {
			templateUrl: 'pages/createProfile.html'
		})

		.when('/logout', {
			templateUrl: 'pages/main.html',
			resolve: {
				logout: function (loginService) {
					//return loginService.logout();
				}
			}

		})

		.when('/events', {
			templateUrl: 'pages/event.html'
		})

		.when('/createEvent', {
			templateUrl: 'pages/createEvent.html'
		})

		.when('/eventSample', {
			templateUrl: 'pages/event_info.html'
		})

		.when('/adminEvent', {
			templateUrl: 'pages/event_admin.html'
		})
		.otherwise('/about');
})
