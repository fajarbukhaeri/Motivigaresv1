'use strict';

angular.module('app', ['angular-loading-bar', 'angularUtils.directives.dirPagination', 'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'mgcrea.ngStrap'])
  .config(function ($httpProvider,$stateProvider, $urlRouterProvider) {
    //for cors 
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    //end 

    $stateProvider
      
      .state('home', {
        url: '/',
        templateUrl: 'app/ang/products/products-list.html',
        controller: 'ProductsListCtrl'
      })

      .state('products-list', {
        url: '/products-list',
        templateUrl: 'app/ang/products/products-list.html',
        controller: 'ProductsListCtrl'
      }).state('products-edit', {
        url: '/products-edit?pId',
        templateUrl: 'app/ang/products/products-edit.html',
        controller: 'ProductsEditCtrl'
      })

      .state('products-spec-list', {
        url: '/products-spec-list',
        templateUrl: 'app/ang/products-spec/products-spec-list.html',
        controller: 'ProductsSpecListCtrl'
      }).state('products-spec-edit', {
        url: '/products-spec-edit?specId',
        templateUrl: 'app/ang/products-spec/products-spec-edit.html',
        controller: 'ProductsSpecEditCtrl'
      })

      .state('profile-change-password', {
        url: '/profile-change-password',
        templateUrl: 'app/ang/profile/change-password.html',
        controller: 'ProductsSpecListCtrl'
      })

      .state('orders-list', {
        url: '/orders-list',
        templateUrl: 'app/ang/orders/orders-list.html',
        controller: 'OrdersListCtrl'
      }).state('orders-view', {
        url: '/orders-view?orderId',
        templateUrl: 'app/ang/orders/orders-view.html',
        controller: 'OrdersViewCtrl'
      })

      .state('categories-list', {
        url: '/categories-list',
        templateUrl: 'app/ang/categories/categories-list.html',
        controller: 'CategoriesListCtrl'
      }).state('categories-edit', {
        url: '/categories-edit?catId',
        templateUrl: 'app/ang/categories/categories-edit.html',
        controller: 'CategoriesEditCtrl'
      })

      .state('shipping-list', {
        url: '/shipping-list',
        templateUrl: 'app/ang/shipping/shipping-list.html',
        controller: 'ShippingListCtrl'
      }).state('shipping-edit', {
        url: '/shipping-edit?shippingId',
        templateUrl: 'app/ang/shipping/shipping-edit.html',
        controller: 'ShippingEditCtrl'
      })

      .state('setting', {
        url: '/setting',
        templateUrl: 'app/ang/setting/setting.html',
        controller: 'SettingCtrl'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'app/ang/account/login.html',
        controller: 'LoginCtrl'
      })
      ;

    $urlRouterProvider.otherwise('/');
  })
    .run(['$rootScope',"Utils", '$state', '$stateParams', '$cookieStore',
    function($rootScope, Utils, $state, $stateParams,$cookieStore) {
      $rootScope.$on('$stateChangeSuccess', function(event, toState, toStateParams) {
        $rootScope.toState = toState;
        $rootScope.toStateParams = toStateParams;
        
        //Utils.removeCookie("setting");
        Utils.getCookie("setting");
        console.log('cookie', Utils.getCookie("setting"));

        if (Utils.getCookie("setting") == null) {
          //console.log($state.current.name);
          if((toState.name == 'login'))
          {
            //window.location.href = "/login";
          }
          else
            $state.go('login');
        }
      });
    }
  ]);