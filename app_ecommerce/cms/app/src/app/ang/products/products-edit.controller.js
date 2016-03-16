'use strict';

angular.module('app')
  .controller('ProductsEditCtrl', function (Utils, $http, SettingSvc, $modal, $scope, $state, ProductsSvc, CategoriesSvc, ProductsSpecSvc, $stateParams) {
      $scope.categories = []; 
      $scope.activeTab = 0;
      $scope.editMode = false; 
      $scope.url = SettingSvc.getPhotoUrl(); 
      $scope.currency = Utils.getCookie('setting').currency;
      $scope.product = {
        name: "", 
        description: "", 
        images: [], 
        old_price: 0.00, 
        new_price: 0.00,
        tax_rate: 0,
        categories_id: "1", 
        quantity: 1, 
        visibility: 0, 
        date_created: new Date().toJSON().slice(0,10), 
        spec_ids: 0
      }
      $scope.image = []; 
      $scope.specs = []; 
      
      var init = function(){
        //retrieve the product 
        if($stateParams.pId != undefined)
        {
          ProductsSvc.findById($stateParams.pId).then(function(result){
            $scope.product = result.data;
            delete $scope.product.id;
            //prepare data formats
            $scope.editMode = true;
            $scope.product.quantity = parseInt($scope.product.quantity);
            $scope.product.tax_rate = parseInt($scope.product.tax_rate);
            $scope.product.spec_ids = JSON.parse($scope.product.spec_ids);
            $scope.product.images = JSON.parse($scope.product.images);
          });   
        }
        //retrieve spec & categories 
        CategoriesSvc.list().then(function(result){
          $scope.categories = result.data; 
          ProductsSpecSvc.list().then(function(result_spec){
            $scope.specs = result_spec.data; 
          }); 
        }); 
      }
      init(); 
      $scope.save = function(){
        //optimizeSpecIds($scope.product.spec_ids); 
        $scope.product.categories_id = parseInt($scope.product.categories_id); 
        $scope.product.quantity = parseInt($scope.product.quantity); 
        $scope.product.tax_rate = parseInt($scope.product.tax_rate);
        $scope.product.visibility = parseInt($scope.product.visibility); 
        $scope.product.spec_ids= parseInt($scope.product.spec_ids);
        $scope.product.images= JSON.stringify($scope.product.images);
        console.log($scope.product);
        if($scope.editMode == true){
          update();   
        }
        else
        {
          create(); 
        }
      }
      var update = function(){
        ProductsSvc.update($scope.product, $stateParams.pId).then(function(result){
            if(result.data != false){
              $state.go($state.current, {}, {reload: true}); 
            }
            else
              var myModal = $modal({title: 'Error', content: 'Something is Wrong!', show: true});
        });
      }
      var create = function(){
        ProductsSvc.create($scope.product).then(function(result){
            if(result.data > 0){
              $state.go("products-edit", {pId : result.data}); 
            }
            else
              var myModal = $modal({title: 'Error', content: 'Something is Wrong!', show: true});
        });
      }
      var optimizeSpecIds = function(obj){
        for (var k in obj) {
          if (!obj.hasOwnProperty(k)) continue;
          if (obj[k] === false) {
            delete obj[k]; 
          }
        }
      }
      $scope.uploadImage = function(files){
        var fd = new FormData();
        fd.append("image", files[0]);

        ProductsSvc.uploadImage(fd).then(function(result){
          $scope.product.images.push(result.data); 
          $scope.save(); 
        });
      }
      $scope.removeImage = function(src){
         ProductsSvc.removeImage(src).then(function(result){
          console.log(result.data); 
          var index = $scope.product.images.indexOf(src);
          $scope.product.images.splice(index, 1); 
          $scope.save(); 
        });
      }
      $scope.remove = function(){
        ProductsSvc.remove($stateParams.pId).then(function(result){
        if(result.data == false)
          var myModal = $modal({title: 'Error', content: 'Something is Wrong!', show: true});
        else
          $state.go("products-list"); 
      });
      }
      $scope.goTo = function(url){
        $state.go(url); 
      }
      
  });
