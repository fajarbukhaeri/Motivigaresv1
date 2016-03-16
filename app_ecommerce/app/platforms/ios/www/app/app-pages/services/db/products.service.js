'use strict';

angular.module("arseneAngularApp")
	.factory("ProductsSvc", function($q, $http, SettingSvc){
		function create(product){
			var deferred = $q.defer();
			$http({
	            method: "POST",
	            data : product,
	            url: SettingSvc.getRootUrl() + "/v1/products/", 
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
	            url: SettingSvc.getRootUrl() + "/v1/products/" + id, 
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
	            url: SettingSvc.getRootUrl() + "/v1/products_delete/" + id, 
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        	}).then(function (result) {
	            deferred.resolve(result);
	        });
			return deferred.promise;
		}
		function list(offset, limit, timer){
			var deferred = $q.defer();
			$http({
	            method: "GET",
	            timeout: timer,
	            url: SettingSvc.getRootUrl() + "/v1/products/" + offset + "/" + limit,
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        	}).then(function (result) {
	            deferred.resolve(result);
	        });
			return deferred.promise;
		}
		function findByCategoryId(catId){
			var deferred = $q.defer();
			$http({
	            method: "GET",
	            url: SettingSvc.getRootUrl() + "/v1/products_category/" + catId, 
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        	}).then(function (result) {
	            deferred.resolve(result);
	        });
			return deferred.promise;
		}
		function searchByName(search){
			console.log(search);
			var deferred = $q.defer();
			$http({
	            method: "GET",
	            timeout: deferred.promise,
	            url: SettingSvc.getRootUrl() + "/v1/search_products/" + search, 
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        	}).then(function (result) {
	            deferred.resolve(result);
	        });
			return deferred.promise;
		}
		function update(product, id){
			var deferred = $q.defer();
			$http({
	            method: "POST",
	            data : product,
	            url: SettingSvc.getRootUrl() + "/v1/products_update/" + id, 
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        	}).then(function (result) {
	            deferred.resolve(result);
	        });
			return deferred.promise;
		}
		function count(){
			var deferred = $q.defer();
			$http({
	            method: "GET",
	            url: SettingSvc.getRootUrl() + "/v1/count_products",
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        	}).then(function (result) {
	            deferred.resolve(result);
	        });
			return deferred.promise;
		}
		function uploadImage(fd){
			var deferred = $q.defer();
			$http({
	            method: "POST",
	            url: SettingSvc.getRootUrl() + "/v1/product_upload_image",
	            data:fd,
	            headers: {'Content-Type': undefined}
        	}).then(function (result) {
	            deferred.resolve(result);
	        });
			return deferred.promise;
		}
		function removeImage(url){
			var deferred = $q.defer();
			$http({
	            method: "GET",
	            url: SettingSvc.getRootUrl() + "/v1/product_remove_image/" + url,
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        	}).then(function (result) {
	            deferred.resolve(result);
	        });
			return deferred.promise;
		}
		return {
		    create : create, 
		    findById : findById,
		    remove : remove,
		    list : list, 
		    findByCategoryId : findByCategoryId,
		    searchByName : searchByName, 
		    update : update, 
		    count : count, 
		    uploadImage : uploadImage, 
		    removeImage : removeImage
		};
	}); 