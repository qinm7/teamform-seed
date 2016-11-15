describe('admin.js test', function() {
	/*describe('testing document.ready functions', function() {
		it('testing testVar', function() {
			angular.element(document).ready(function() {
				expect(testVar).toEqual(6);
			});
		});
	});*/
	var $controller, $rootScope, controller, $scope;

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
			/*it('testing document ready', function() {
				angular.element(document).ready(function() {
					expect($scope.eventName).toEqual(getURLParameter("q"));
				});
			});*/

		});

});
