'use strict';

angular.module("app")
	.factory("CategoriesSvc", function($q, $http, SettingSvc){
		function create(category){
			var deferred = $q.defer();
			$http({
	            method: "POST",
	            data : category,
	            url: SettingSvc.getRootUrl() + "/v1/categories", 
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
	            url: SettingSvc.getRootUrl() + "/v1/categories/" + id, 
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
	            url: SettingSvc.getRootUrl() + "/v1/categories_delete/" + id, 
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
	            url: SettingSvc.getRootUrl() + "/v1/categories",
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        	}).then(function (result) {
	            deferred.resolve(result);
	        });
			return deferred.promise;
		}
		function update(category, id){
			var deferred = $q.defer();
			$http({
	            method: "POST",
	            data : category,
	            url: SettingSvc.getRootUrl() + "/v1/categories_update/" + id, 
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
		    update : update,
		};
	}); 