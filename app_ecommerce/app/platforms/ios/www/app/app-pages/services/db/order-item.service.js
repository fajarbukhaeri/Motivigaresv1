'use strict';

angular.module("arseneAngularApp")
	.factory("OrderItemSvc", function($q, $http, SettingSvc){
		function create(order_item){
			var deferred = $q.defer();
			$http({
	            method: "POST",
	            data : order_item,
	            url: SettingSvc.getRootUrl() + "/v1/order_item", 
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        	}).then(function (result) {
	            deferred.resolve(result);
	        });
			return deferred.promise;
		}
		return {
		    create : create, 
		};
	}); 