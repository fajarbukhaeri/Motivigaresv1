'use strict';

angular.module('app')
  .controller('LoginCtrl', function (Utils, $scope, $state, ProfileSettingSvc) {
  	$scope.account = {
      username: "", 
      password: ""
    }; 
  	$scope.login = function(){
  		ProfileSettingSvc.login($scope.account).then(function(result){
        console.log(Utils.getCookie("setting")); 
        console.log(result.data); 
        $state.go('home'); 
      });
  	}
    
  });
