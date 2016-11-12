describe('admin.js test', function() {
	var $controller, $rootScope, controller, $scope;;

		beforeEach( function() {
			module('teamform-admin-app');
			inject(function(_$controller_,_$rootScope_,_$firebaseObject_,_$firebaseArray_) {
				$controller=_$controller_;
				$rootScope=_$rootScope_;
				$firebaseObject = _$firebaseObject_;
				$firebaseArray = _$firebaseArray_;
			});
		});
		describe('Function tests', function() {
			beforeEach(function() {
				$scope=$rootScope.$new();
				controller = $controller('AdminCtrl', {$scope: $scope});
			});
			it('testing eventName', function() {
				expect(controller.eventName).toBeUndefined();
			});

		});

});
