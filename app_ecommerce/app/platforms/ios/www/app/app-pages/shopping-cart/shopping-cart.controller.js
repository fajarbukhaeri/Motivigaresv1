'use strict';

angular.module('arseneAngularApp')
  .controller('ShoppingCartCtrl', function (ProfileSettingSvc, $state, OrderItemSvc, OrdersSvc, UtilsSvc, ShippingSvc, PaypalSvc, ShoppingCartSvc, CategoriesSvc, SettingSvc, StoreLocalSvc, $scope, ProductsSvc) {

	/* variables */
	$scope.cartProducts = [];
	$scope.isEmpty = true;
	$scope.urlpay = window.location.href;
	$scope.shippingMethods = []; 
	$scope.validateOrder; 
	$scope.payment_types = []; 
	$scope.order = {
		code: UtilsSvc.createRandomCode(),
		date_time: UtilsSvc.formatDate(new Date(), "dddd h:mmtt d MMM yyyy"),
		customer_firstname: "",
		customer_lastname: "",
		customer_email_address: "",
		customer_country : "",
		customer_city: "",
		customer_address: "",
		customer_zipcode : "",
		customer_phone_number: "",
		customer_note : "",
		total_amount : 0,
		customer_shipping_class: "",
		customer_shipping_price: "",
		payment_type: ""
	}
	/* call services */
	$scope.cartItems = ShoppingCartSvc.getCart();
	$scope.url = SettingSvc.getPhotoUrl();
	$scope.currencyType = StoreLocalSvc.get().currency;

	ProfileSettingSvc.get(1).then(function(result){
		if(result.data.payment_type == "paypal-cash"){
			$scope.payment_types = ['via PayPal', 'Cash on Delivery'];
		}
		else if(result.data.payment_type == "cash")
		{
			$scope.payment_types = ['Cash on Delivery'];
		}
		else if(result.data.payment_type == "paypal")
		{
			$scope.payment_types = ['via PayPal'];
		}
		$scope.order.payment_type = $scope.payment_types[0];
		//$scope.order.payment_type = result.data.payment_type;
		console.log($scope.order.payment_type);
		
	});
	/* private functions */
	function updateCart(){
		$scope.cartItems = ShoppingCartSvc.getCart();
	}
	function page_load(){
		if(ShoppingCartSvc.count() == 0){
			$scope.isEmpty = true;
		}
		else
			$scope.isEmpty = false;

		ShippingSvc.list().then(function(result){
			$scope.shippingMethods = result.data;
			$scope.order.customer_shipping_class = result.data[0].title;
			$scope.order.customer_shipping_price = result.data[0].price;
		});
		
		//return all validate as true
		$scope.validateOrder = UtilsSvc.setTrueFormValidation($scope.order);
		findCartProducts(); 
	}
	
	function findProduct(pid, i){
		var _result;
		ProductsSvc.findById(pid).then(function(result){
			_result = result.data;
			_result.tax_rate = parseInt(result.data.tax_rate);
			
			_result.quantity = $scope.cartItems[i].quantity;
			_result.spec_title = $scope.cartItems[i].spec_title;
			_result.spec_value = $scope.cartItems[i].spec_value;
			CategoriesSvc.findById(_result.categories_id).then(function(result_cat){
				console.log(result_cat.data);
				_result.category_name = result_cat.data.name;
				$scope.cartProducts.push(_result);
			});
		});
	}
	var findCartProducts = function(){
		for(var i=0;i< $scope.cartItems.length;i++){
			var pid = parseInt($scope.cartItems[i].pid);
			findProduct(pid, i);
		}
	}
	$scope.toJSON = function(images){
		if(images == null || images == "" || images == undefined)
			return "/";
		else
			return JSON.parse(images)[0];
	}
	$scope.shippingMethods_change = function(index){
		$scope.order.customer_shipping_price = $scope.shippingMethods[index].price;
	}
	$scope.countCartProducts = function(){
		return ShoppingCartSvc.count();
	}
	$scope.updateTotal = function(){
		$scope.order.total_amount = 0;
		for(var i=0;i<$scope.cartProducts.length;i++){
			$scope.order.total_amount += $scope.cartItems[i].subTotal;
		}
		$scope.order.total_amount += parseInt($scope.order.customer_shipping_price); 
		return $scope.order.total_amount;
	}
	/* actions */
	$scope.getSubTotal = function(index){
		var result = ($scope.cartProducts[index].new_price * $scope.cartItems[index].quantity); 
		var _result = result * ($scope.cartProducts[index].tax_rate/100);
		var sub_ = result + _result; 
		$scope.cartItems[index].subTotal = sub_;
		//update total 
		$scope.updateTotal();
		return sub_;
	}
	$scope.viewProduct_tap = function(_id, _specValue){
		console.log('from sc', _id, _specValue);
      	$scope.pageNav.pushPage($scope.viewsUrl + "/products/products-single-view.html", {id:_id,specValue: _specValue, animation: StoreLocalSvc.ui().pageEffect}); 
    }
    $scope.goToHome_tap = function(){
    	$state.go($state.current, {}, {reload: true}); 
    }
    $scope.viewCheckOut_tap = function(){
      $scope.pageNav.pushPage($scope.viewsUrl + "/shopping-cart/shopping-cart-checkout.html", {animation: StoreLocalSvc.ui().pageEffect}); 
    }
    $scope.increaseQuantity_tap = function(item){
    	ShoppingCartSvc.increaseQuantity(item);
    	updateCart();
    }
    $scope.decreaseQuantity_tap = function(item){
    	ShoppingCartSvc.decreaseQuantity(item);
    	updateCart();
    }
    $scope.removeItem_tap = function(item, indexOfProductItem){
    	ShoppingCartSvc.removeItem(item);
    	updateCart();
    	$scope.cartProducts.splice(indexOfProductItem, 1);
    }
    function createOrder(){
    	ShoppingCartSvc.clear();
     	delete $scope.order.customer_shipping_price;
		OrdersSvc.create($scope.order).then(function(result){
     		for(var i=0; i<$scope.cartProducts.length;i++){
				var orderItem = {
					order_id: result.data,
					product_price: $scope.cartProducts[i].new_price,
					product_quantity: parseInt($scope.cartProducts[i].quantity), 
					product_name: $scope.cartProducts[i].name, 
					product_category: $scope.cartProducts[i].category_name,
					product_spec: JSON.stringify([{
						title: $scope.cartProducts[i].spec_title,
						value: $scope.cartProducts[i].spec_value
					}])
				}
				OrderItemSvc.create(orderItem).then(function(result){
					console.log('item id : ',result.data);
				});
			}
			$scope.pageNav.pushPage($scope.viewsUrl + "/shopping-cart/thank-you.html", {animation: StoreLocalSvc.ui().pageEffect});
     	});
    }
    function onSuccesfulPayment(payment) {
     	//console.log("payment success: " + JSON.stringify(payment, null, 4));
     	createOrder();
   	}
   	function onAuthorizationCallback(authorization) {
     	console.log("authorization: " + JSON.stringify(authorization, null, 4));
   	}
   	function onUserCanceled(authorization) {
     	console.log("canceled: " + JSON.stringify(authorization, null, 4));
   	}
   	$scope.payCash = function(){
   		$scope.order.customer_note = "Optional";
		$scope.validateOrder = UtilsSvc.formValidation($scope.order);
		//JUST FOR TEST
		try{
			if($scope.validateOrder.validateAll == true)
				createOrder();
		}
		catch(err){
		}
   		
   	}
	$scope.pay = function(){
		$scope.order.customer_note = "Optional";
		$scope.validateOrder = UtilsSvc.formValidation($scope.order);
		//JUST FOR TEST
		try{
			if($scope.validateOrder.validateAll == true)
				PayPalMobile.renderSinglePaymentUI(PaypalSvc.createPayment($scope.order.total_amount), onSuccesfulPayment, onUserCanceled);	
		}
		catch(err){
		}
	}
	
	if(typeof PayPalMobile != 'undefined')
		PaypalSvc.initPaymentUI();
	page_load();
  });