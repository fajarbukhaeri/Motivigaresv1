'use strict';

angular.module("arseneAngularApp")
	.factory("SettingSvc", function(){
		//Your Website URL
		//var url = 'http://phpstack-6499-15421-56916.cloudwaysapps.com';
		// var url = 'http://10.0.2.2/app_ecommerce';
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