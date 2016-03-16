'use strict';

angular.module('arseneAngularApp', ['angular-loading-bar', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router','onsen'])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    //for cors 
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/app-pages/components/navigation.html',
        controller: 'ProductsViewCtrl'
      });
      $urlRouterProvider.otherwise('/');
  });