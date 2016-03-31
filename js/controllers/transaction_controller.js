stockApp.controller("transactionCtrl", ['$scope', 'transactionService', function($scope, transactionService) {

  $scope.transactions = transactionService.getTransactions();
  $scope.sortType = "transactionStock";
  $scope.sortAsc = false;
  $scope.transactionFilter = "";
  $scope.regex = '\\d+';
}])