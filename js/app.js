var stockApp = angular.module("stockApp", ['ui.router', 'ui.bootstrap'] )

stockApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');
  
  $stateProvider

    .state('index', {
      url: '/',
      views: {
        'navbar': {
          templateUrl: 'templates/navbar.html'
        },

        'stockpanel': {          
          templateUrl: 'templates/stock_panel.html',
          controller: 'StockCtrl',
          //params: { data: null, 
          //          symbol: null}
        },

        'datepicker': {
          templateUrl: 'templates/datepicker.html',
          controller: 'DateCtrl'
        },

        'main': {
          templateUrl: 'templates/main.html',
        },
      },
    })

    .state('index.trades', {
      url: 'trades',
      templateUrl: "templates/trades.html",
      controller: 'tradesCtrl',
      params: { data: null, 
                symbol: null}
    })

    .state('index.transactions', {
      url: 'transaction',
      templateUrl: "templates/transactions.html",
      controller: 'transactionCtrl'
    })

    .state('index.portfolio', {
      url: 'portfolio',
      templateUrl: "templates/portfolio.html",
      controller: 'tradesCtrl'
    })

});


// enable error handling
stockApp.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});