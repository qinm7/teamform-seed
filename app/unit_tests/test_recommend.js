describe('test recommend.js', function() {
	beforeEach( function() {
		module('teamform-46380');
		inject(function(_$controller_,_$rootScope_) {
			$controller=_$controller_;
			$rootScope=_$rootScope_;
		});
	});
	describe('test recommend functions', function() {
		  var controller, $scope;
		beforeEach(function() {
			$scope=$rootScope.$new();
			controller = $controller('RecommendCtrl', {$scope: $scope});
		});
		it('initial variables', function() {
			expect(events).toBeDefined();
		});
		it(' getSub returns Type Sub of "java" ', function() {
			var value = controller.getSub("Java");
			expect(value).toEqual("Java");
		});
		/*it(' getCat returns Category of Type Cat ', function() {
			var val = controller.getCat("skills");
			expect(val.name).toEqual("skills");
		});*/
	});
});
