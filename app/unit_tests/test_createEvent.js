describe('test createEvent.js', function() {

	beforeEach( function() {
		module('teamformApp','firebase');
		inject(function(_$controller_,_$rootScope_,_$firebaseArray_,$state_) {
			$controller = _$controller_;
			$rootScope = _$rootScope_;
			$firebaseArray = _$firebaseArray_;
			$state = _$state_;
		});
	});
	
	describe('test teamForm.events', function() {
		  var controller, ref, $scope, $firebaseArray, $state;
		beforeEach(function() {
			$scope = $rootScope.$new();
			ref = firebase.database().ref("TeamForm/events/");
			$firebaseArray = $firebaseArray(ref);
			controller = $controller('createEventCtrl', {$scope: $scope});
		});
		it('should be initial', function() {
			expect($scope.input).toBeDefined();
		});
		it('addEvent should change input.created', function() {
			expect(controller.addEvent()).toBeDefined();
		});
	});
});
