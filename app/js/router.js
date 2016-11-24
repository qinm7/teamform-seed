var app = angular.module('teamformApp', ['ui.router', 'firebase']);
app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		//route for the home page
		.state('about', {
			url: '/about',
			templateUrl: 'pages/main.html',
			authenticate: false
		})
		.state('myProfile', {
			url: '/profile/:id',
			templateUrl: 'pages/createProfile.html',
			controller: 'myProfileCtrl',
			authenticate: true
		})

		.state('userProfile', {
			url: '/userprofile/:id',
			templateUrl: 'pages/userProfile.html',
			controller: 'myProfileCtrl',
			authenticate: true
		})

		.state('logout', {
			url: "/logout",
			templateUrl: 'pages/main.html',
			authenticate: false

		})

		.state('events', {
			url: '/events',
			templateUrl: 'pages/event.html',
			controller: 'displayEventCtrl',
			authenticate: false
		})

		.state('createEvent', {
			url: "/createEvent",
			templateUrl: 'pages/createEvent.html',
			controller: 'createEventCtrl',
			authenticate: true
		})

		.state('createTeam', {
			url: "/createTeam/:id",
			templateUrl: 'pages/createTeam.html',
			controller: 'createTeamCtrl',
			authenticate: true
		})

		.state('editEvent', {
			url: "/editEvent/:id",
			templateUrl: 'pages/editEvent.html',
			controller: 'editEventCtrl',
			authenticate: true
		})

		.state('eventPage', {
			url: "/eventPage/:id",
			templateUrl: 'pages/event_info.html',
			controller: 'eventCtrl',
			authenticate: false
		})

		.state('teamPage', {
			url: "/teamPage/:id",
			templateUrl: 'pages/team_info.html',
			controller: 'teamCtrl',
			authenticate: false
		})

		.state('adminEvent', {
			url: "/adminEvent",
			templateUrl: 'pages/event_admin.html',
			authenticate: true
		})
	$urlRouterProvider.otherwise("/about");
})
	.run(function ($rootScope, $state) {
		$rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
			var user = firebase.auth().currentUser;
			if (toState.authenticate && !user) {
				alert("Please login first");
				//$state.transitionTo("about");
				event.preventDefault();
			}

			if (toState.url == '/profile' || toState.url == '/userprofile') {
				//myProfileService.queryData();
			}

		});
	});
