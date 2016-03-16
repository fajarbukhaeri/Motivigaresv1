'use strict';

angular.module('app')
  .controller('OrdersViewCtrl', function ($scope, $state, OrdersSvc, $stateParams, Utils) {
  	$scope.order = []; 
  	$scope.items = []; 
  	$scope.specs = []; 
    $scope.currency = Utils.getCookie('setting').currency;
      OrdersSvc.findById($stateParams.orderId).then(function(result){
        $scope.order = result.data; 
        OrdersSvc.items($stateParams.orderId).then(function(result_items){
        	$scope.items = result_items.data; 
        	for(var i=0;i<$scope.items.length;i++){
        		$scope.items[i].product_spec = JSON.parse($scope.items[i].product_spec);
        	}
        }); 
      });
      $scope.getItemSpec = function(itemId){
      	$scope.specs = JSON.parse($scope.items[itemId]);
      }
      $scope.goTo = function(url){
        $state.go(url); 
      }
      $scope.activeTab = 0;
  });

