stockApp.factory('tradeService', ['$http', function($http) {
  
  var obj = {};
  var cashBalance = 100000;
  var portfolio = {"APPL":{"qty":100,"costbasis":2100},
                  "CSCO":{"qty":100,"costbasis":220},
                  "FB":{"qty":100,"costbasis":2550}}; 

  obj.getCashBalance = function() {
    return cashBalance;
  };

  obj.updateCashBalance = function(transaction_type,amount) {
    if (transaction_type == "Buy") {
       cashBalance -= amount;
    } else {
       cashBalance += amount;
    }

  };

  obj.getPortfolio = function() {
    return portfolio;
  }
  
  obj.checkStockInPortfolio = function(symbol) {
    console.log("hello");
    return (symbol in portfolio);
  }
   
  obj.updatePortfolio = function(txData) {

    var stockData = {};
    stockData.costbasis = 0;
    stockData.qty = 0;

    if (obj.checkStockInPortfolio(txData.sym)) {
       stockData.costbasis = portfolio[txData.sym].costbasis;
       stockData.qty = portfolio[txData.sym].qty;
    }

    if (txData.type == "Buy") {

       stockData.qty += Number(txData.qty);
       stockData.costbasis -= txData.cost;
    } else  {
      stockData.qty -=  Number(txData.qty);
      stockData.costbasis += txData.cost;
    }

    portfolio[txData.sym] = stockData;

  }

  return obj;
}])
