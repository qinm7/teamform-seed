describe('test script.js', function() {
	beforeEach( function() {
		module('scotchApp');
		inject(function(_$controller_,_$rootScope_) {
			$controller=_$controller_;
			$rootScope=_$rootScope_;
		});
	});
	it('test routeProvider', function() {
		$routeProvider = '/about';
		expect($routeProvider).toEqual('/about');
	});
	describe('test maincontroller', function() {
		var controller, $scope;
		beforeEach(function() {
			$scope=$rootScope.$new();
			controller = $controller('mainController', {$scope: $scope});
		});
		it('testing message', function() {
			expect($scope.message).toEqual('Everyone come and see how good I look!');
		});
	});
	describe('test contactController', function() {
		var controller, $scope;
		beforeEach(function() {
			$scope=$rootScope.$new();
			controller = $controller('contactController', {$scope: $scope});
		});
		it('testing message', function() {
			expect($scope.message).toEqual('Contact us! JK. This is just a demo.');
		});
	});
	describe('test aboutController', function() {
		var controller, $scope;
		beforeEach(function() {
			$scope=$rootScope.$new();
			controller = $controller('aboutController', {$scope: $scope});
		});
		it('testing message', function() {
			expect($scope.message).toEqual('Look! I am an about page.');
		});
	});
	
});
