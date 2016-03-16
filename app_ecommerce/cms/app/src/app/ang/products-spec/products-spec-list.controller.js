'use strict';

angular.module('app')
  .controller('ProductsSpecListCtrl', function ($scope, $state, ProductsSpecSvc) {
      $scope.specs = []; 
      ProductsSpecSvc.list().then(function(result){
        $scope.specs = result.data; 
      });

      $scope.goTo = function(url){
        $state.go(url);
      }
  });
