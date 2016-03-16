'use strict';

angular.module("app")
	.factory("OrdersSvc", function($q, $http, SettingSvc){
		function create(category){
			var deferred = $q.defer();
			$http({
	            method: "POST",
	            data : category,
	            url: SettingSvc.getRootUrl() + "/v1/orders", 
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        	}).then(function (result) {
	            deferred.resolve(result);
	        });
			return deferred.promise;
		}
		function findById(id){
			var deferred = $q.defer();
			$http({
	            method: "GET",
	            url: SettingSvc.getRootUrl() + "/v1/orders/" + id, 
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        	}).then(function (result) {
	            deferred.resolve(result);
	        });
			return deferred.promise;
		}
		
		function list(){
			var deferred = $q.defer();
			$http({
	            method: "GET",
	            url: SettingSvc.getRootUrl() + "/v1/orders",
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        	}).then(function (result) {
	            deferred.resolve(result);
	        });
			return deferred.promise;
		}
		function items(id){
			var deferred = $q.defer();
			$http({
	            method: "GET",
	            url: SettingSvc.getRootUrl() + "/v1/order_items/" + id,
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        	}).then(function (result) {
	            deferred.resolve(result);
	        });
			return deferred.promise;
		}
		function search(search_text){
			var deferred = $q.defer();
			$http({
	            method: "GET",
	            url: SettingSvc.getRootUrl() + "/v1/search_orders/" + search_text,
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        	}).then(function (result) {
	            deferred.resolve(result);
	        });
			return deferred.promise;
		}
		
		return {
		    create : create, 
		    findById : findById,
		    list : list, 
		    items : items
		};
	}); 