'use strict';

angular.module("arseneAngularApp")
	.factory("ShippingSvc", function($q, $http, SettingSvc){
		function create(sclass){
			var deferred = $q.defer();
			$http({
	            method: "POST",
	            data : sclass,
	            url: SettingSvc.getRootUrl() + "/v1/shipping_classes", 
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
	            url: SettingSvc.getRootUrl() + "/v1/shipping_classes/" + id, 
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
	            url: SettingSvc.getRootUrl() + "/v1/shipping_classes",
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        	}).then(function (result) {
	            deferred.resolve(result);
	        });
			return deferred.promise;
		}

		function remove(id){
			var deferred = $q.defer();
			$http({
	            method: "POST",
	            url: SettingSvc.getRootUrl() + "/v1/shipping_classes_delete/" + id, 
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        	}).then(function (result) {
	            deferred.resolve(result);
	        });
			return deferred.promise;
		}
		function update(object, id){
			var deferred = $q.defer();
			$http({
	            method: "POST",
	            data: object,
	            url: SettingSvc.getRootUrl() + "/v1/shipping_classes_update/" + id, 
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
		    remove : remove,
		    update: update
		};
	}); 