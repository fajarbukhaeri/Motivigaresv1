'use strict';

angular.module('arseneAngularApp')
  .controller('ProductsViewCtrl', function (ShoppingCartSvc, CategoriesSvc, SettingSvc, StoreLocalSvc, $http, $q, $scope, ProductsSvc) {
    /* variables */
    $scope.isGrid = false; 
    var countProducts = 0;
    $scope.products = []; 
    $scope.images = [];
    $scope.categories = []; 
    $scope.cartCount;
    $scope.category;
    $scope.productsByCategory;

    /* call services */
    $scope.viewsUrl = StoreLocalSvc.get().viewsUrl;
    $scope.currencyType = StoreLocalSvc.get().currency;
    $scope.url = SettingSvc.getPhotoUrl(); 
    $scope.siteName = StoreLocalSvc.get().name;
    $scope.logoUrl = StoreLocalSvc.get().logo; 

    /* private functions */
    $scope.goTo = function(url){
      $scope.pageNav.pushPage($scope.viewsUrl + url, { animation: StoreLocalSvc.ui().pageEffect }); 
    }
    $scope.menuItemGoTo = function(url){
      $scope.menu.closeMenu({animation: 'none'});
      $scope.pageNav.pushPage($scope.viewsUrl + url); 
    }
    /* actions */
    $scope.gridProducts_list = function(){
      ProductsSvc.count().then(function(result){
        countProducts = result.data; 
      });
      var MyDelegate = {
        configureItemScope : function(index, itemScope) {
          if (!itemScope.product) {
            itemScope.canceler = $q.defer();    
            
            itemScope.product = {
              id: 0,
              name: '',
              images: '',
              new_price: '',
              old_price: ''
            }; 

            ProductsSvc.list(index,1, itemScope.canceler.promise).then(function(result){
              itemScope.product.id = result.data[0].id; 
              itemScope.product.name = result.data[0].name; 
              itemScope.product.new_price = result.data[0].new_price; 
              itemScope.product.old_price = result.data[0].old_price; 
              itemScope.product.image = JSON.parse(result.data[0].images)[0]; 
            });
          }
        },
        calculateItemHeight : function(index) {
          return 510;
        },
        countItems : function() {
          return countProducts; 
        },
        destroyItemScope: function(index, itemScope) {
          itemScope.canceler.resolve();
        }
      };
      return MyDelegate;
    }
    $scope.listProducts_list = function(){
      var MyDelegate = {
        configureItemScope : function(index, itemScope) {
          if (!itemScope.product) {
            itemScope.canceler = $q.defer();    
            itemScope.product = {
              id: 0,
              name: '',
              images: '',
              new_price: '',
              old_price: '',
            }; 

            ProductsSvc.list(index,1, itemScope.canceler.promise).then(function(result){
              itemScope.product.id = result.data[0].id; 
              itemScope.product.name = result.data[0].name; 
              itemScope.product.new_price = result.data[0].new_price; 
              itemScope.product.old_price = result.data[0].old_price; 

              itemScope.product.image = JSON.parse(result.data[0].images)[0]; 
            });
          }
        },
        calculateItemHeight : function(index) {
          return 85;
        },
        countItems : function() {
          return countProducts; 
        },
        destroyItemScope: function(index, itemScope) {
          itemScope.canceler.resolve();
          console.log("Destroyed product #" + index);
        }
      };
      return MyDelegate;
    }
    $scope.loadCategory_tap = function(_id, _name){
      
      $scope.goTo("/products/categories-products.html");
      $scope.menu.closeMenu({animation: 'none'});
      $scope.category = {id: _id, name: _name};
      console.log($scope.category);
      ProductsByCategory_list();
    }
    function ProductsByCategory_list(){
      ProductsSvc.findByCategoryId($scope.category.id).then(function(result){
        $scope.productsByCategory = result.data; 
        for(var i=0;i<$scope.productsByCategory.length;i++){
          $scope.productsByCategory[i].images =JSON.parse($scope.productsByCategory[i].images)[0];
        }
      });
    }
    function menu_load(){
      CategoriesSvc.list().then(function(result){
        $scope.categories = result.data; 
      });
    }
    $scope.viewProduct_tap = function(_id){
      $scope.pageNav.pushPage($scope.viewsUrl + "/products/products-single-view.html", {id:_id, animation: StoreLocalSvc.ui().pageEffect}); 
    }
    function updateCart_state(){
      $scope.cartCount = ShoppingCartSvc.count();
    }
    $scope.addToCart_Tap = function(item){
    if($scope.spec != null){
      $scope.cartItem = {
        pid: item.id,
        quantity: 1,
        spec_title: $scope.specs[0].title,
        spec_value: $scope.specs[0].selected
       }
    }
    else
    {
      $scope.cartItem = {
        pid: item.id,
        quantity: 1,
        spec_title: "",
        spec_value: ""
       }
    }
    if(ShoppingCartSvc.addItem($scope.cartItem) == false){
      $scope.goTo('shopping-cart.html');
    }
    else
      $scope.addToCart_state = true;
    updateCart_state();
  }
    
    /* call actions */
    menu_load();
    
    /* custom */
    $scope.$watch(function () {
       return ShoppingCartSvc.count();
     },                       
      function() {
        $scope.cartCount = ShoppingCartSvc.count();
    }, true);
  });