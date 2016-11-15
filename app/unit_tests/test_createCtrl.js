describe('test createCrtl.js', function() {
	beforeEach( function() {
		module('teamform-46380');
		inject(function(_$controller_,_$rootScope_) {
			$controller=_$controller_;
			$rootScope=_$rootScope_;
			//$firebaseArray=_$firebaseArray_;
		});
	});
	describe('test teamForm.events', function() {
		  var controller, $scope; //, firebaseArray;
		beforeEach(function() {
			$scope=$rootScope.$new();
			//firebaseArray = $firebaseArray;
			controller = $controller('createCtrl', {$scope: $scope});
		});
		it('should be initial', function() {
			expect($scope.input).toBeDefined();
		});
		it('addEvent should change input.created', function() {
			expect(controller.addEvent()).toBeDefined();
		});
	});
});
