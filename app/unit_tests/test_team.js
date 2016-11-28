describe('team.js test', function() {
	var $controller, $rootScope, controller, $scope;

	beforeEach( function() {
		module('teamformApp');
		inject(function(_$controller_,_$rootScope_,_$firebaseObject_,_$firebaseArray_) {
			$controller=_$controller_;
			$rootScope=_$rootScope_;
			$firebaseObject = _$firebaseObject_;
			$firebaseArray = _$firebaseArray_;
		});
	});
	describe('team.js Function tests', function() {
		beforeEach(function() {
			$scope=$rootScope.$new();
			controller = $controller('TeamCtrl', {$scope: $scope});
		});
		it('testing retreive', function() {
			expect($scope.refreshViewRequestsReceived()).toBeUndefined();
		});
	});
});
