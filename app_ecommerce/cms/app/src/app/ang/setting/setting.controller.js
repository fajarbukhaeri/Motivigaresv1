'use strict';

angular.module('app')
  .controller('SettingCtrl', function (Utils, $scope, $state, ProfileSettingSvc) {
  	$scope.activeTab = 0; 
  	$scope.setting = [];
  	var init = function(){
  		ProfileSettingSvc.get(1).then(function(result){
			$scope.setting = result.data; 
			delete $scope.setting.id;
		}); 
  	}
  	//check for edit/add status 
  	init(); 
  	$scope.save = function(){
  		ProfileSettingSvc.update($scope.setting, 1).then(function(){
        Utils.removeCookie("setting");
  			ProfileSettingSvc.login($scope.setting).then(function(){
  				console.log(Utils.getCookie("setting")); 
  			});
  		});
  	}
    
  });
