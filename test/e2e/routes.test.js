'use strict';

describe('Wallet routes test', function(){

	var basePath = 'http://localhost/angular-apps/wallet/';

	beforeEach(function(){
		browser.get(basePath);
	});

	it('the browser location should be /#/',function(){
		expect(browser.getCurrentUrl()).toContain("/#/");
	});

	it('the browser location should be /#/ for eny other wrong location',function(){
		browser.get(basePath+'#/blablabla');
		expect(browser.getCurrentUrl()).toContain("/#/");
	});

	it('the browser location should be /#/info',function(){
		browser.get(basePath+'#/info');
		expect(browser.getCurrentUrl()).toContain("#/info");
	});
});