describe('test login.js', function() {
	beforeEach( function() {
		module('teamform-46380');
		inject(function(_$controller_,_$rootScope_,_$location_,_$state_) {
			$controller=_$controller_;
			$rootScope=_$rootScope_;
			$location=_$location_;
			$state = _$state_;
		});
	});
	describe('Checking app factory loginService', function() {
		/*beforeEach(inject(function() {
			var $injector = angular.injector(['teamform-46380']);
			var loginService = $injector.get('loginService');
		}));*/
		it('check initial variables', function() {
			expect($rootScope.user).toBeUndefined();
		});
		it('Check isLoggedIn.get', function() {
			expect($rootScope.isLoggedIn.get()).toBeFalsy();
		});
	});
	describe('test recommend functions', function() {
		var location, state, controller, $scope;
		beforeEach(function() {
			location = $location;
			state = $state;
			$scope=$rootScope.$new();
			controller = $controller('AuthCtrl', {$scope: $scope});
		});
		it('Check isLoggedIn var', function() {
			expect($scope.isLoggedIn).toBeDefined();
		});
		/*it('login is called and defined', function() {
			expect($scope.login()).toBeDefined();
		});*/
	});
});
