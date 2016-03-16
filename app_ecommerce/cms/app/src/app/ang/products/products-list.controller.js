'use strict';

angular.module('app')
  .controller('ProductsListCtrl', function ($scope, $state, ProductsSvc, CategoriesSvc) {
      $scope.products = []; 
      $scope.count = 0; 
      $scope.categories; 
      ProductsSvc.count().then(function(result){
          $scope.count = result.data; 
          ProductsSvc.list(0, $scope.count).then(function(result_){
            $scope.products = result_.data; 
          });
        });

      $scope.findCat = function(id){
        CategoriesSvc.findById(id).then(function(result){
            return result.data.name; 
          }); 
      }
      $scope.goTo = function(url){
        $state.go(url); 
      }
  });
