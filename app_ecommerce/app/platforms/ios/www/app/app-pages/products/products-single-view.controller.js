'use strict';

angular.module('arseneAngularApp')
  .controller('ProductsSingleViewCtrl', function (ShoppingCartSvc, ProductsSpecSvc, CategoriesSvc, SettingSvc, StoreLocalSvc, $scope, $state, ProductsSvc) {
	/* variables */
	$scope.addToCart_visibility = false;
	$scope.addToCart_state = false;
	$scope.specValueDefault = "";
	$scope.product = {};
	$scope.spec;
	$scope.carouselItem_selected = {current: 0};
	/* call services */
	$scope.viewsUrl = StoreLocalSvc.get().viewsUrl;
	$scope.currencyType = StoreLocalSvc.get().currency;
	$scope.url = SettingSvc.getPhotoUrl();
	var params = $scope.pageNav.getCurrentPage().options;
	console.log(params);
	
	/* private functions */
	function spliter(_text){
		var value_temp; 
		var values = []; 
		for(var i=0;i<= _text.length;i++){
		  if(_text[i] == ',' || (i == _text.length)){
			value_temp = value_temp.replace("undefined", ""); 
		  	value_temp = value_temp.trim();
			values.push(value_temp); 
			value_temp = "";
		  }
		  else
		  	value_temp += _text[i];
		}
		return values; 
	}
	$scope.goTo = function(url){
		$scope.pageNav.pushPage($scope.viewsUrl + url, { animation: StoreLocalSvc.ui().pageEffect }); 
	}
	function updateCart_state(){
	 	$scope.cartCount = ShoppingCartSvc.count();
	}
	
	/* actions */
	function page_load(){
		updateCart_state();
		ProductsSvc.findById(params.id).then(function(result){
			$scope.product = result.data;
			$scope.product.images = JSON.parse($scope.product.images);

			if($scope.product.spec_ids != null && $scope.product.spec_ids != 0){
				ProductsSpecSvc.findById($scope.product.spec_ids).then(function(_result){
				  	var _values = spliter(_result.data.values);
				  	if(params.specValue != null){
				  		$scope.specValueDefault = params.specValue;
				  		$scope.addToCart_state = true;
				  	}
				  	else
				  		$scope.specValueDefault = _values[0];
					 var spec = {
					 	title : _result.data.title,
					 	values : _values,
					 	selected: $scope.specValueDefault
					};
					$scope.spec = spec;
					$scope.addToCart_visibility = true;
				});
			}
			$scope.addToCart_visibility = true;
		 });
		//show add to button
		
	}
	$scope.specSelect_change = function(item){
		
		if(ShoppingCartSvc.isExist(item.id,$scope.spec.selected) == false){
			$scope.addToCart_state = false;	
		}
		else
			$scope.addToCart_state = true;
	}
	$scope.addToCart_Tap = function(item){

		if($scope.spec != null){
			$scope.cartItem = {
			 	pid: item.id,
			 	quantity: 1,
			 	spec_title: $scope.spec.title,
			 	spec_value: $scope.spec.selected
			 }
		}
		else
		{
			$scope.cartItem = {
			 	pid: item.id,
			 	quantity: 1,
			 	spec_title: "",
			 	spec_value: ""
			 }
		}
		if($scope.addToCart_state == false){
			ShoppingCartSvc.addItem($scope.cartItem);
			$scope.addToCart_state = true;
		}
		else
		{
			$scope.goTo('/shopping-cart/shopping-cart-view.html');
		}
	 	updateCart_state();
	}

	/* call actions */
	page_load();
	
  });