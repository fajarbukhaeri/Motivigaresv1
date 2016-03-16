'use strict';

angular.module('app')
  .controller('ShippingEditCtrl', function ($modal, $scope, Utils, $state, ShippingSvc, $stateParams) {
    $scope.editMode = false; 
    $scope.currency = Utils.getCookie('setting').currency;
    $scope.shipping = {
      title: "", 
      description: ""
    }
    var init = function(){
      if($stateParams.shippingId != undefined){
        $scope.editMode = true;
        ShippingSvc.findById($stateParams.shippingId).then(function(result){
          $scope.shipping = result.data; 
          delete $scope.shipping.id;
        }); 
      }
      
    }
    //check for edit/add status 
    init(); 
    $scope.save = function(){
      if($scope.editMode == false){
        ShippingSvc.create($scope.shipping).then(function(){
          $state.go("shipping-list"); 
        });   
      }
      else
      {
        var ss= JSON.stringify($scope.shipping); 
        ShippingSvc.update(ss, $stateParams.shippingId).then(function(){
          console.log($scope.shipping); 
          $state.go("shipping-list"); 
        });
      }
    }
    
    $scope.remove = function(){
      ShippingSvc.remove($stateParams.shippingId).then(function(result){
        if(result.data == true)
          $state.go("shipping-list"); 
      });
    }
  });