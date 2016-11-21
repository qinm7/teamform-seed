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
		/*it('check $urlRouteProvider', function() {
			$urlRouteProvider = '/about';
			expect($urlRouteProvider).toEqual('/about');
			
		});*/
		it('checking $stateProvider', function() {
			expect($stateProvider.state('/about')).toBeDefined();
		});
	});
});
