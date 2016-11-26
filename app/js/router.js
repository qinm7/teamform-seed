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
			authenticate: true,
			resolve: {
				"currentAuth": function ($firebaseAuth) {
					return $firebaseAuth().$requireSignIn();
				}
			}
		})

		.state('userProfile', {
			url: '/userprofile/:id',
			templateUrl: 'pages/userProfile.html',
			controller: 'myProfileCtrl',
			resolve: {
				"currentAuth": function ($firebaseAuth) {
					return $firebaseAuth().$requireSignIn();
				}
			},
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
			resolve: {
				"currentAuth": function ($firebaseAuth) {
					return $firebaseAuth().$requireSignIn();
				}
			},
			authenticate: true
		})

		.state('createTeam', {
			url: "/createTeam/:id",
			templateUrl: 'pages/createTeam.html',
			controller: 'createTeamCtrl',
			resolve: {
				"currentAuth": function ($firebaseAuth) {
					return $firebaseAuth().$requireSignIn();
				}
			},
			authenticate: true
		})

		.state('editEvent', {
			url: "/editEvent/:id",
			templateUrl: 'pages/editEvent.html',
			controller: 'editEventCtrl',
			resolve: {
				"currentAuth": function ($firebaseAuth) {
					return $firebaseAuth().$requireSignIn();
				}
			},
			authenticate: true
		})

		.state('editTeam', {
			url: "/editTeam/:id",
			templateUrl: 'pages/editTeam.html',
			controller: 'editTeamCtrl',
			resolve: {
				"currentAuth": function ($firebaseAuth) {
					return $firebaseAuth().$requireSignIn();
				}
			},
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
			resolve: {
				"currentAuth": function ($firebaseAuth) {
					return $firebaseAuth().$requireSignIn();
				}
			},
			authenticate: true
		})

	$urlRouterProvider.otherwise("/about");
})
	.run(function ($rootScope, $state) {

		$rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
			if (error === "AUTH_REQUIRED") {
				alert("Please login first");
				//$state.go("about");
			}
		});
	});
