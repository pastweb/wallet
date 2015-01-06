'use strict';

describe('Wallet hheader tests', function() {

	var homePath = 'http://localhost/angular-apps/wallet';
	var sourcePath = 'https://github.com/pastweb/wallet';
	var inputText_amount = element(by.model('amount'));
	var addButton = element(by.id('addBtn'));

	var homeButton = element(by.id('homeBtn'));
	var resetButton = element(by.id('resetBtn'));
	var sourceButton = element(by.id('sourceBtn'));
	var infoButton = element(by.id('infoBtn'));

	var balance = element(by.binding('$storage.balance'));

  	function add(value){
    	inputText_amount.sendKeys(value);
    	addButton.click();
  	};

  	beforeEach(function(){
    	browser.get(homePath);
  	});

  	it('shold reset the balance value',function(){
  		add(56);
  		expect(balance.getText()).toBe('£  56');
  		resetButton.click();
  		expect(balance.getText()).toBe('£  0');
  	});

  	it('should show the info page',function(){
  		infoButton.click();
  		expect(element(by.id('info_content'))).toBeDefined();
  		expect(browser.getCurrentUrl()).toContain('info');
  	});

  	it('shoult back to the home page', function(){
  		expect(browser.getCurrentUrl()).toBe(homePath+'/#/');
  		infoButton.click();
  		expect(browser.getCurrentUrl()).toContain('info');
  		homeButton.click();
  		expect(browser.getCurrentUrl()).toBe(homePath+'/#/');

  	});

  	it('shold navigate to the GIT souce page',function(){
  		expect(browser.getCurrentUrl()).toBe(homePath+'/#/');
  		sourceButton.click();
  		browser.ignoreSynchronization = true;
  		expect(browser.getCurrentUrl()).not.toBe(homePath+'/#/');
  	});
});