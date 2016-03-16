angular.module('app')
	.factory("Utils", function($window, $cookieStore){
		function setCookie(name, value){
			return $cookieStore.put(name, value); 
		}
		function getCookie(name){
			return $cookieStore.get(name); 
		}
		function removeCookie(name){
			return $cookieStore.remove(name); 
		}

		function setLocalStorage(name, value){
			return $window.localStorage.setItem(name, value); 
		}
		function getLocalStorage(name){
			return $window.localStorage.getItem(name); 
		}
		function removeLocalStorage(name){
			return $window.localStorage.removeItem(name); 
		}
		return {
			setLocalStorage : setLocalStorage,
			getLocalStorage : getLocalStorage, 
			removeLocalStorage : removeLocalStorage,
			setCookie : setCookie,
			getCookie : getCookie, 
			removeCookie : removeCookie
		}; 
	}); 