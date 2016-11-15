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
			firebaseObject = $firebaseObject;
			firebaseArray = $firebaseArray;
			controller = $controller('MemberCtrl', {$scope: $scope, $firebaseObject: firebaseObject, $firebaseArray: firebaseArray});
		});
		it('testing initial variables', function() {
			expect($scope.userID).toBeUndefined();
			expect($('#text_event_name').value).toBeUndefined();
		});
		it('loadFunc should be Defined', function() {
			expect(controller.loadFunc()).toBeDefined();
		});
		it('saveFunc should be defined', function() {
			expect(controller.saveFunc()).toBeDefined();
		});
		it('refreshTeams is defined', function() {
			expect(controller.refreshTeams()).toBeDefined();
		});
	});
});
