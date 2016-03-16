angular.module('arseneAngularApp')
	.factory("ShoppingCartSvc", function($window, $cookieStore){
		/*
		** pid
			quantity
			specs
			spec_title: "",
			spec_value: ""
		*/
		
		var cartItems = []; 
		function isExist(id,spec_v){
			_isExist = false;
			if(cartItems == null)
				cartItems.length = 0;

			for(var i = 0; i < cartItems.length; i++){
				if(cartItems[i].pid == id){
					if(cartItems[i].spec_value == spec_v)
					{
						_isExist = true;
					}
				}
			}
			return _isExist;
		}
		function addItem(item){
			cartItems.push(item); 
			return true; 
		}
		function getCart(){
			return cartItems; 
		}
		function removeItem(item){
			for(var i = 0; i < cartItems.length; i++){
				if(cartItems[i].pid == item.pid && cartItems[i].spec_value == item.spec_value){
					cartItems.splice(i, 1); 
				}
			}
		}
		function increaseQuantity(item){
			for(var i = 0; i < cartItems.length; i++){
				if(cartItems[i].pid == item.pid && cartItems[i].spec_value == item.spec_value){
					cartItems[i].quantity ++; 
				}
			}
		}
		function decreaseQuantity(item){
			for(var i = 0; i < cartItems.length; i++){
				if(cartItems[i].pid == item.pid && cartItems[i].spec_value == item.spec_value){
					if(cartItems[i].quantity > 1)
						cartItems[i].quantity --;
				}
			}
		}
		function count(){
			if(cartItems == null)
				return 0;
			else
				return cartItems.length;
		}
		function clear(){
			cartItems = [];
		}
		return {
			addItem:addItem,
			getCart:getCart, 
			removeItem:removeItem,
			increaseQuantity:increaseQuantity,
			decreaseQuantity:decreaseQuantity,
			count:count,
			isExist:isExist,
			clear: clear
		}; 
	});