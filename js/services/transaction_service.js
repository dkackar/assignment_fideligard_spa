stockApp.factory('transactionService', ['$http', function($http) {
  
  var obj = {};

  var transactionDate = new Date();
  var transactionStock = "";
  var transactionQty = 1;
  var transactionCost = 0;
  var transactionPrice = 0;
  var transactionType = "Buy";

  var transactions = [];

  obj.getTransactionDate = function() {
    return transactionDate;
  }

  obj.getTransactionQty = function() {
    return transactionQty;
  }

  obj.getTransactionStock = function() {
    return transactionStock;
  }

  obj.getTransactionCost = function() {
    return transactionCost;
  }

  obj.getTransactionPrice = function() {
    return transactionPrice;
  }

  obj.getTransactions = function() {
    return transactions;
  }

  obj.addTransaction = function(txData) {
    current = {};
    current.transactionStock = txData.sym;
    current.transactionQty = txData.qty;
    current.transactionDate = new Date();
    current.transactionCost = txData.cost;
    current.transactionPrice = txData.price;
    current.transactionType = txData.type;
    transactions.push(current);
    console.log("Added TX");
    console.log(transactions);

  };

  obj.getTransactionDetails = function() {
  }

  // obj.tmpTransaction = function(tradeSymbol,tradeData) {
  //   console.log("Now In here");
  //   transactionStock = tradeSymbol;
  //   transactionsQty = 1;
  //   transactionPrice = 50;
  // }

  return obj;
}])
