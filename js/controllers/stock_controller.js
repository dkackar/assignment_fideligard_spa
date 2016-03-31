stockApp.controller("StockCtrl",
  ['$scope', '$rootScope', 'dateService', 'stockService', 'transactionService',
   function($scope, $rootScope, dateService, stockService, transactionService){

    //console.log( $stateParams );

    $scope.stocks = {};
    $scope.currentDate = dateService.getCurrentDate();
    $scope.stocksTable = stockService.getStocksByDate();
    $scope.stocks = stockService.getQuery();
    
    $scope.getByDate = function() {        
      $scope.currentDate = Number(dateService.getCurrentDate());  
      stockService.getByDate($scope.currentDate);
      $scope.stocksTable = stockService.getStocksByDate();
    };
  
    $scope.trade = function(tradeSymbol,tradeData) {
      transactionService.tmpTransaction(tradeSymbol,tradeData);
    }  
  }]
  
);