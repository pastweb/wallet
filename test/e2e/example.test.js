describe('Wallet homepage', function() {
  
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
    browser.get('http://localhost/angular-apps/wallet/new/wallet/#/');
  });

  it('should check the right page title', function() {
    expect(browser.getTitle()).toEqual('Wallet');
  });

  it('should check the balance value to 0 after the reset', function() {
    reset();
    expect(balance.getText()).toEqual('£  0');
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

/*  describe('todo list', function() {
    var todoList;

    beforeEach(function() {
      browser.get('http://www.angularjs.org');

      todoList = element.all(by.repeater('todo in todos'));
    });

    it('should list todos', function() {
      expect(todoList.count()).toEqual(2);
      expect(todoList.get(1).getText()).toEqual('build an angular app');
    });

    it('should add a todo', function() {
      var addTodo = element(by.model('todoText'));
      var addButton = element(by.css('[value="add"]'));

      addTodo.sendKeys('write a protractor test');
      addButton.click();

      expect(todoList.count()).toEqual(3);
      expect(todoList.get(2).getText()).toEqual('write a protractor test');
    });
  });*/
});
