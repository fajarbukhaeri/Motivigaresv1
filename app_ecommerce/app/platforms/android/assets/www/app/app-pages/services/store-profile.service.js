'use strict';

angular.module("arseneAngularApp")
	.factory("StoreLocalSvc", function(){
		function get(){
			var setting = {
				"currency" : "IDR ",
				"logo" : "assets/images/logo.jpg",
				"name" : "Motiviga Store",

				"viewsUrl" : "app/app-pages",

				"payPalSandbox" : "AS1LaPmotXY-rYhKIwcvqdokB1hhSN817_OP4j61F3Jhxx3MbmJI61nVj6isEnJ3bnUTRt52S21oRfMG",
				"payPalProduction" : "YOUR_PRODUCTION_CLIENT_ID"
			}
			return setting; 
		}
		function ui(){
			var ui = {
				"pageEffect" : "fade"
			}
			return ui; 
		}
		return {
		    get : get,
		    ui : ui
		};
	}); 