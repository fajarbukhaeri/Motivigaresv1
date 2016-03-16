'use strict';

angular.module("app")
	.factory("SettingSvc", function(){
		//Your Website URL
		var url = 'http://localhost/app_ecommerce'; 
		function getRootUrl(){
			return url + '/cms/api'; 
		}
		function getPhotoUrl(){
			return url + '/cms/api/uploads/'; 
		}
		return {
		    getRootUrl : getRootUrl, 
		    getPhotoUrl : getPhotoUrl
		};
	}); 