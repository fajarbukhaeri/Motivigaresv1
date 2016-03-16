'use strict';

angular.module('app')
  .controller('CategoriesEditCtrl', function ($modal, $scope, $state, CategoriesSvc, $stateParams) {
  	$scope.editMode = false; 
  	$scope.category = {
  		name: "", 
  		description: ""
  	}
  	var init = function(){
  		if($stateParams.catId != undefined){
  			$scope.editMode = true;
  			CategoriesSvc.findById($stateParams.catId).then(function(result){
  				$scope.category = result.data; 
  				delete $scope.category.id;
  			}); 
  		}
  		
  	}
  	//check for edit/add status 
  	init(); 
  	$scope.save = function(){
  		if($scope.editMode == false){
  			CategoriesSvc.create($scope.category).then(function(){
  				$state.go("categories-list"); 
  			}); 	
  		}
  		else
  		{
  			//add catId for existing cat
  			var ss= JSON.stringify($scope.category); 
  			CategoriesSvc.update(ss, $stateParams.catId).then(function(){
  				$state.go("categories-list"); 
  			});
  		}
  	}
  	
  	$scope.remove = function(){
  		CategoriesSvc.remove($stateParams.catId).then(function(result){
  			if(result.data == false)
  				var myModal = $modal({title: 'Error', content: 'You have products in this category, you cannot delete it', show: true});
  			else
  				$state.go("categories-list"); 
  		});
  	}

    $scope.goTo = function(url){
        $state.go(url); 
      }
  });