'use strict';

angular.module("arseneAngularApp")
	.factory("PaypalSvc", function(StoreLocalSvc){
		function initPaymentUI(){
	 		var clientIDs = {
	       "PayPalEnvironmentProduction": StoreLocalSvc.get().payPalProduction,
	       "PayPalEnvironmentSandbox": StoreLocalSvc.get().payPalSandbox
	     	};
	     	PayPalMobile.init(clientIDs, onPayPalMobileInit);
	 	}
	 	
	   function createPayment(total_price) {
	     var paymentDetails = new PayPalPaymentDetails(total_price, "0.00", "0.00");
	     var payment = new PayPalPayment(total_price, StoreLocalSvc.get().currency, "Your Orders", "Sale", paymentDetails);
	     return payment;
	   }
	   function configuration() {
	     var config = new PayPalConfiguration({merchantName: StoreLocalSvc.get().name, merchantPrivacyPolicyURL: "https://mytestshop.com/policy", merchantUserAgreementURL: "https://mytestshop.com/agreement"});
	     return config;
	   }
	   function onPayPalMobileInit() {
	     PayPalMobile.prepareToRender("PayPalEnvironmentSandbox", configuration());
	   }
	   function onUserCanceled(result) {
	     console.log(result);
	   }

		return {
		    initPaymentUI : initPaymentUI, 
		    createPayment : createPayment,
		    configuration : configuration,
		    onPayPalMobileInit: onPayPalMobileInit,
		};
	});