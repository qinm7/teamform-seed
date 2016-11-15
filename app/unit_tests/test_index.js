describe('index.js test', function() {
	beforeEach('try to heold ready', function() {
		$.holdReady(false);
	});
	it('testing click function', function() {
		$('input_text').value = 'a';
		$("#btn_admin").click();
		expect($('input_text').value).toBeDefined();
	});
	it('testing "input_text"', function() {
		$('#input_text').value = 'a';
		expect($('#input_text').value).toEqual('a');
	});
	/*it('testing btn_member click', function() {
		var value = $("#btn_leader").click();
		expect(value).toBeDefined();
	});*/
});
