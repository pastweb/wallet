'use strict';

describe('Wallet homepage tests', function() {
  
  var resetButton = element(by.id('resetBtn'));
  var balance = element(by.binding('$storage.balance'));
  var inputText_amount = element(by.model('amount'));
  var addButton = element(by.id('addBtn'));
  var rmButton = element(by.id('rmBtn'));
  var statments = element.all(by.repeater('operation in $storage.operations'));

  function add(value){
    inputText_amount.sendKeys(value);
    addButton.click();
  };

  function remove(value){
    inputText_amount.sendKeys(value);
    rmButton.click();
  };

  function reset(){
    resetButton.click();
  };

  beforeEach(function(){
    browser.get('http://localhost/angular-apps/wallet/');
  });

  it('should check the right page title', function() {
    expect(browser.getTitle()).toEqual('Wallet');
  });

  it('should check the balance value to 0 after the reset', function() {
    reset();
    expect(balance.getText()).toEqual('£  0');
  });

  it('shold show a modal error', function(){
    rmButton.click();
    expect(element(by.id('modal_backdrop'))).toBeDefined();
  });

  it('should check the right balance value after a value added', function() {
    add(45);
    expect(balance.getText()).toEqual('£  45');
  });

  it('should check the right balance value after a value subtracted', function() {
    add(55);
    remove(15);
    expect(balance.getText()).toEqual('£  85');
  });

  it('should check the number of the statments to be 3', function(){
    expect(statments.count()).toEqual(3);
  });

  it('should check the number of the statments to be 0', function(){
    reset();
    expect(statments.count()).toEqual(0);
  });
});
