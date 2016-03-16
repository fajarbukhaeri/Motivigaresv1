'use strict';

angular.module("app")
	.factory("ProfileSettingSvc", function($q, $http, SettingSvc, Utils){
		function update(user, id){
			var deferred = $q.defer();
			$http({
	            method: "POST",
	            data : user,
	            url: SettingSvc.getRootUrl() + "/v1/setting_update/" + id, 
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        	}).then(function (result) {
	            deferred.resolve(result);
	        });
			return deferred.promise;
		}
		function get(id){
			var deferred = $q.defer();
			$http({
	            method: "GET",
	            url: SettingSvc.getRootUrl() + "/v1/setting/" + id,
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        	}).then(function (result) {
        		//Utils.setLocalStorage(result.data); 
	            deferred.resolve(result);
	        });
			return deferred.promise;
		}
		function login(loginInfo){
			var deferred = $q.defer();
			$http({
	            method: "POST",
	            data: loginInfo,
	            url: SettingSvc.getRootUrl() + "/v1/setting_login",
	            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        	}).then(function (result) {
        		if(result.data != false){
        			Utils.setCookie("setting", result.data);
        		}
        		deferred.resolve(result.data);
	            
	        });
			return deferred.promise;
		}
		return {
		    update : update, 
		    get : get, 
		    login : login
		};
	}); 