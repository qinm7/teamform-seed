describe('test createEvent.js', function() {

	var controller, ref, $scope, $firebaseArray, $state;
	beforeEach(module('teamformApp'));
		//ref = firebase.database().ref("TeamForm/events/");
	beforeEach(inject(function($rootScope,$controller/*,_$firebaseArray_,_$state_*/) {
			$scope = $rootScope.$new();
			$controller('createEventCtrl', {$scope: $scope});
			//$firebaseArray = _$firebaseArray_;
			//$state = _$state_;
	}));
	
	describe('test teamForm.events', function() {

		it('should be initial', function() {
			var foo = {
				admin: "",
				created: "",
				description: "",
				icon: "",
				name: "",
				tags: [""]
			}
			expect($scope.input).toEqual(foo);
		});

		it('addEvent should change input.created', function() {
		});
	});
});
