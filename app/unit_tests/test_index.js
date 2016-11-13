describe('index.js test', function() {
	it('testing click function', function() {
		var value = $("#btn_admin").click();
		expect(value).toBeDefined();
	});
	it('testing btn_member click', function() {
		var value = $("#btn_leader").click();
		expect(value).toBeDefined();
	});
});
