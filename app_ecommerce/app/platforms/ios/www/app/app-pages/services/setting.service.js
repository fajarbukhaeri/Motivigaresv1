'use strict';

angular.module("arseneAngularApp")
	.factory("SettingSvc", function(){
		//Your Website URL
		var url = 'http://www.hotspicyapps.com'; 
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