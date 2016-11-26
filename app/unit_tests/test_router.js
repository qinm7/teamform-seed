describe('test router.js', function() {
	beforeEach( function() {
		module('teamformApp');
		inject(function(_$controller_,_$rootScope_,_$stateProvider_,_$urlRouterProvider_) {
			$controller=_$controller_;
			$rootScope=_$rootScope_;
			$stateProvider=_$stateProvider_;
			$urlRouterProvider=_$urlRouterProvider_;
		});
	});
	describe('testing app config', function() {
		/*it('checking $stateProvider', function() {
			expect($urlRouterProvider).toBeDefined();
		});*/
	});
});
