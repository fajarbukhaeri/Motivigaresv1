'use strict';

angular.module('arseneAngularApp')
  .controller('SampleCtrl', function (ShoppingCartSvc, CategoriesSvc, SettingSvc, StoreLocalSvc, $scope, $state, ProductsSvc) {
	/* variables */
	
	/* call services */

	/* private functions */
	$scope.goTo = function(url){
		$scope.pageNav.pushPage($scope.viewsUrl + url, { animation: StoreLocalSvc.ui().pageEffect }); 
	}
	function updateCart_state(){
	 	$scope.cartCount = ShoppingCartSvc.count();
	}

	/* actions */
	
  });