describe('member.js test', function() {
	var $controller, $rootScope, controller, $scope;

	beforeEach( function() {
		module('teamform-member-app');
		inject(function(_$controller_,_$rootScope_,_$firebaseObject_,_$firebaseArray_) {
			$controller=_$controller_;
			$rootScope=_$rootScope_;
			$firebaseObject = _$firebaseObject_;
			$firebaseArray = _$firebaseArray_;
		});
	});
	describe('Member.js Function tests', function() {
		beforeEach(function() {
			$scope=$rootScope.$new();
			controller = $controller('MemberCtrl', {$scope: $scope});
		});
		it('testing initial variables', function() {
			expect($scope.userID).toBe("");
		});
		it('loadFunc should be Defined', function() {
			expect($scope.loadFunc()).toBeDefined();
		});
	});
});
