'use strict';

angular.module('app')
  .controller('NavbarCtrl', function ($scope, $state, Utils) {
    $scope.goTo = function(url){
        $state.go(url); 
      }
      $scope.logout = function(){
      	Utils.removeCookie('setting'); 
      	$state.go('login'); 
      }
  });
