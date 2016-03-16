'use strict';

angular.module('arseneAngularApp')
  .controller('SearchCtrl', function (UtilsSvc, SettingSvc, StoreLocalSvc, $scope, ProductsSvc) {
	/* variables */
	$scope.SearchIcon = false;
	/* call services */
	$scope.url = SettingSvc.getPhotoUrl();
	$scope.currencyType = StoreLocalSvc.get().currency;
	/* private functions */
	/* actions */
	$scope.searchResult = [];
	$scope.search = {name:""};
	$scope.search_change = function(){
		if($scope.search.name != ""){
			var _searchResult; 
			ProductsSvc.searchByName($scope.search.name).then(function(result){
				$scope.searchResult = result.data;
				console.log(result.data);
			});
		}
		else
		{

		}
		
	}
	$scope.toJSON = function(images){
		return JSON.parse(images)[0];
	}
	$scope.viewProduct_tap = function(_id){
      $scope.pageNav.pushPage($scope.viewsUrl + "/products/products-single-view.html", {id:_id, animation: StoreLocalSvc.ui().pageEffect}); 
    }
    $scope.cancelSearch_tap = function(){
    	$scope.SearchIcon = false;
    	$scope.search.name = "";
    	UtilsSvc.hideKeyboard();
    	$scope.pageNav.popPage($scope.viewsUrl + "/products/products-view.html", {animation: StoreLocalSvc.ui().pageEffect}); 
    }
	
  });