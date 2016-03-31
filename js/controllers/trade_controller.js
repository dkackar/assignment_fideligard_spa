stockApp.controller('tradesCtrl',
  ['$scope', 'transactionService', 'tradeService', 'stockService', '$stateParams',
   function($scope, transactionService, tradeService, stockService, $stateParams){

      $scope.cashBalance = tradeService.getCashBalance();
      $scope.portfolio   = tradeService.getPortfolio();
      $scope.orderStatus = true;
      $scope.errMsg = "";
      $scope.transactionStock;
      $scope.transactionQty;
      $scope.transactionPrice;
      $scope.transactionCost;
      $scope.transactionType; 

      // When Trade is clicked from Stock Panel
      $scope.tradeUpdate = function(symbol,data,type) {
        if (symbol) {
           $scope.transactionStock = symbol;
           $scope.transactionQty = 1;
           $scope.transactionPrice = Math.round(data['0'] * 100) / 100;
           $scope.transactionCost = Math.round(data['0'] * $scope.transactionQty* 100) / 100;
           $scope.transactionType = "Buy";
        }
      }
      
      //Change in Qty causes this function call
      $scope.updateCost = function() {
        $scope.transactionCost = Number($scope.transactionPrice) * Number($scope.transactionQty);

        balance = Number($scope.cashBalance) - Number($scope.transactionCost);
        if (balance < 0 ) {
          $scope.orderStatus = false;
          $scope.errMsg = "NOT ENOUGH BALANCE! ";
        } else {
          $scope.orderStatus = true;
          $scope.errMsg = "";
        }
      }

      $scope.checkStockOwned = function() {
        if ($scope.transactionType == "Sell") {
           $scope.orderStatus = tradeService.checkStockInPortfolio($scope.transactionStock);
           if (!$scope.orderStatus) {
              $scope.errMsg = "STOCK NOT OWNED! ";
           } else {
             $scope.errMsg = "";
           }
        }
      }

      //Submit button will cause this function call
      $scope.addTransaction = function(formIsValid) {
        
        $scope.checkStockOwned();

        if(formIsValid && $scope.orderStatus){
          txData = {sym:$scope.transactionStock, 
                   price:$scope.transactionPrice, 
                   cost:$scope.transactionCost, 
                   qty: $scope.transactionQty,
                   type: $scope.transactionType};
          
          transactionService.addTransaction(txData);
          tradeService.updateCashBalance($scope.transactionType, $scope.transactionCost);
          $scope.cashBalance = tradeService.getCashBalance();
          tradeService.updatePortfolio(txData);

          $scope.orderStatus = true;
          $scope.errMsg = "";
        } else {
          $scope.orderStatus = false;
          $scope.errMsg = "FIELD ERRORS!";
        }
      }  

      //When TRade is clicked on the Stock Panel
      $scope.tradeUpdate($stateParams.symbol,$stateParams.data);
    }]
  
);