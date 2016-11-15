describe('test router.js', function() {
	beforeEach( function() {
		module('teamformApp');
		inject(function(_$controller_,_$rootScope_) {
			$controller=_$controller_;
			$rootScope=_$rootScope_;
		});
	});
	describe('testing app config', function() {
		it('check $routeProvider', function() {
			$routeProvider = '/about';
			expect($routeProvider).toEqual('/about');
		});
	});
});
