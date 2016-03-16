'use strict';

angular.module('app')
  .controller('CategoriesListCtrl', function ($scope, $state, CategoriesSvc) {
  	$scope.categories = []; 
  	CategoriesSvc.list().then(function(result){
  		$scope.categories = result.data;  
  	}); 
    $scope.goTo = function(url){
      $state.go(url); 
    }
    $scope.editCategory = function(id){
      $state.go('categories-edit', ({catId : id}));  
    }
  });