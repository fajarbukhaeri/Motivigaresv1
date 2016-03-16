'use strict';

angular.module('app')
  .controller('ShippingListCtrl', function ($scope, $state, ShippingSvc, Utils) {
  	  $scope.currency = Utils.getCookie('setting').currency;
      $scope.shipping = []; 
      ShippingSvc.list().then(function(result){
        $scope.shipping = result.data; 
      });

      $scope.goTo = function(url){
        $state.go(url);
      }
  });
