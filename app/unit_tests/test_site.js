describe('Test site.js', function() {
	
   //
   // Example: A test case of getRandomIntInclusive
   //
   describe('getRandomIntInclusive Coverage Test', function() {

	  it('value within 1 to 3', function() {
	  	var value = getRandomIntInclusive(1, 3);
	  	expect( value>=1 && value <= 3 ).toEqual(true);
	  });

   });
   describe('getURLParameter Coverage Test', function() {
	it('value returns name', function() {
		var value = getURLParameter("http://stackoverflow.com/questions/21673404/error-ngareq-from-angular-controller");
		expect(value).toEqual(null);
	});
   });
   describe('initializeFirebase Coverage Test', function() {
	/*var $controller, $rootScope, controller, $scope;;

	beforeEach( function() {
		inject(function(_$controller_,_$rootScope_) {
			$controller=_$controller_;
			$rootScope=_$rootScope_;
		});
	});
		beforeEach(function() {
			$scope=$rootScope.$new();
			controller = $controller('TodoListController', {$scope: $scope});
		});
	it('initializeFirebase has no return', function() {
		expect(controller.initializeFirebase()).toBeUndefined();
	});*/
	it('initializeFirebase has no return', function() {
		expect(initalizeFirebase()).toBeDefined();
	});
   });

   describe('retrieveOnceFirebase Coverage Test', function() {
	it('no return function', function() {
		var firebase = "something";
		var refPath = "app/long";
		var callbackFunc = "somefunction";
		var value = retrieveOnceFirebase(firebase, refPath, callbackFunc);
		expect(value).toBeDefined();
	});
   });


});
