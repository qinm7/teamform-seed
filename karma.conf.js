//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',
	frameworks: ['jasmine'],
    files: [
    'lib/jquery.min.js',
    'lib/angular.js',
    'lib/firebase.js',
    'lib/angularfire.min.js',
    'lib/angular-mocks.js',
    'js/router.js',
    'js/!(router).js',
    'unit_tests/*.js'	  
    ],
	exclude: [
	],
	preprocessors: {	 
		 //'js/team.js' : ['coverage'],
		 //'js/createCtrl.js' : ['coverage'],
		 'js/createEvent.js' : ['coverage'],
		 //'js/createProfile.js' : ['coverage'],
		 //'js/createTeam.js' : ['coverage'],
		 //'js/event.js' : ['coverage'],
 		 //'js/login.js' : ['coverage'],
	 	 //'js/recommend.js' : ['coverage'],
		 'js/router.js' : ['coverage']
		 //'js/search.js' : ['coverage'],
		 //'js/router.js' : ['coverage']
	},
	reporters: ['progress', 'coverage'],
	coverageReporter: {
			type: 'html',
			dir: 'coverage/',
			subdir: '.'
	},
	port: 8080,
	colors: true,
    browsers: ['Firefox'], //Changed from Chrome
	singleRun: true,
    plugins: [
    'karma-chrome-launcher', 
    'karma-firefox-launcher',     
    'karma-jasmine',
    'karma-coverage'
    ]    

  });
};
