'use strict';

angular.module('app')
  .controller('ProductsSpecEditCtrl', function ($modal, $scope, $state, ProductsSpecSvc, $stateParams) {
  	$scope.editMode = false; 
  	$scope.spec = {
  		title: "", 
  		values: ""
  	}
  	var init = function(){
  		if($stateParams.specId != undefined){
  			$scope.editMode = true;
  			ProductsSpecSvc.findById($stateParams.specId).then(function(result){
  				$scope.spec = result.data; 
  				delete $scope.spec.id;
  			}); 
  		}
  		
  	}
  	//check for edit/add status 
  	init(); 
  	$scope.save = function(){
  		if($scope.editMode == false){
  			ProductsSpecSvc.create($scope.spec).then(function(){
  				$state.go("products-spec-list"); 
  			}); 	
  		}
  		else
  		{
  			//add specId for existing cat
  			var ss= JSON.stringify($scope.spec); 
  			ProductsSpecSvc.update(ss, $stateParams.specId).then(function(){
  				$state.go("products-spec-list"); 
  			});
  		}
  	}
  	
  	$scope.remove = function(){
  		ProductsSpecSvc.remove($stateParams.specId).then(function(result){
  			if(result.data == false)
  				var myModal = $modal({title: 'Error', content: 'Something is Wrong!', show: true});
  			else
  				$state.go("products-spec-list"); 
  		});
  	}

    $scope.goTo = function(url){
        $state.go(url); 
      }
  });