'use strict';

describe('Wallet routes test', function(){
	beforeEach(function(){
		browser().navigateTo('/');
	});

	it('the browser location should be /#/',function(){
		expect(browser().location().path()).toBe("/#/");
	});

	it('the browser location should be /#/ for eny other wrong location',function(){
		browser().navigateTo('/blablabla');
		expect(browser().location().path()).toBe("/#/");
	});

	it('the browser location should be /#/info',function(){
		browser().navigateTo('/#/info');
		expect(browser().location().path()).toBe("/#/info");
	});
});