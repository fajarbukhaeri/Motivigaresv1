<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

    require 'Slim/Slim.php';
    //Controllers
    require 'Controllers/Controllers.php';
    require 'app.php';

    $app->response->headers->set('Content-Type', 'application/json');
    /* products v1 */

    $app->get('/url', function () use($app) {
         echo "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    });

    $app->get('/v1/products/:offset/:limit', function ($offset, $limit) use($app) {
         $instance = new \Controllers\ProductsCtrl(); 
         $result = $instance->productsList($offset, $limit); 
    });
    $app->get('/v1/products/:id', function ($id) use($app) {
         $instance = new \Controllers\ProductsCtrl(); 
         $result = $instance->findById($id); 
    });
    $app->get('/v1/products_category/:id', function ($id) use($app) {
         $instance = new \Controllers\ProductsCtrl(); 
         $result = $instance->findByCategoryId($id); 
    });
    $app->post('/v1/products/', function () use($app) {
         $instance = new \Controllers\ProductsCtrl(); 
         $result = $instance->createProduct(); 
    });
    $app->post('/v1/products_update/:id', function ($id) use($app) {
         $instance = new \Controllers\ProductsCtrl(); 
         $result = $instance->updateProduct($id); 
    });
    $app->post('/v1/products_delete/:id', function ($id) use($app) {
         $instance = new \Controllers\ProductsCtrl(); 
         $result = $instance->deleteProduct($id); 
    });
    $app->get('/v1/count_products', function () use($app) {
         $instance = new \Controllers\ProductsCtrl(); 
         $result = $instance->countProducts(); 
    });
    $app->get('/v1/search_products/:search', function ($search_text) use($app) {
         $instance = new \Controllers\ProductsCtrl(); 
         $result = $instance->searchByName($search_text); 
    });

    $app->post('/v1/product_upload_image', function () use($app) {
         $instance = new \Controllers\ProductsCtrl(); 
         $result = $instance->uploadImage(); 
    });
    $app->get('/v1/product_remove_image/:src', function ($src) use($app) {
         $instance = new \Controllers\ProductsCtrl(); 
         $result = $instance->removeImage($src); 
    });

    //product spec v1

    $app->get('/v1/product_spec', function () use($app) {
         $instance = new \Controllers\ProductSpecCtrl(); 
         $result = $instance->SpecList(); 
    });
    $app->get('/v1/product_spec/:id', function ($id) use($app) {
         $instance = new \Controllers\ProductSpecCtrl(); 
         $result = $instance->findById($id); 
    });
    $app->post('/v1/product_spec/', function () use($app) {
         $instance = new \Controllers\ProductSpecCtrl(); 
         $result = $instance->createSpec(); 
    });
    $app->post('/v1/product_spec_update/:id', function ($id) use($app) {
         $instance = new \Controllers\ProductSpecCtrl(); 
         $result = $instance->updateSpec($id); 
    });
    $app->post('/v1/product_spec_delete/:id', function ($id) use($app) {
         $instance = new \Controllers\ProductSpecCtrl(); 
         $result = $instance->deleteSpec($id); 
    });

    //product Shipping Class v1

    $app->get('/v1/shipping_classes', function () use($app) {
         $instance = new \Controllers\ShippingClassCtrl(); 
         $result = $instance->ShippingClasses(); 
    });
    $app->get('/v1/shipping_classes/:id', function ($id) use($app) {
         $instance = new \Controllers\ShippingClassCtrl(); 
         $result = $instance->findById($id); 
    });
    $app->post('/v1/shipping_classes/', function () use($app) {
         $instance = new \Controllers\ShippingClassCtrl(); 
         $result = $instance->createShipping(); 
    });
    $app->post('/v1/shipping_classes_update/:id', function ($id) use($app) {
         $instance = new \Controllers\ShippingClassCtrl(); 
         $result = $instance->updateShipping($id); 
    });
    $app->post('/v1/shipping_classes_delete/:id', function ($id) use($app) {
         $instance = new \Controllers\ShippingClassCtrl(); 
         $result = $instance->deleteShipping($id); 
    });

    //Orders

    $app->get('/v1/orders', function () use($app) {
         $instance = new \Controllers\OrdersCtrl(); 
         $result = $instance->listItems(); 
    });
    $app->get('/v1/orders/:id', function ($id) use($app) {
         $instance = new \Controllers\OrdersCtrl(); 
         $result = $instance->findById($id); 
    });
    $app->get('/v1/order_items/:id', function ($id) use($app) {
         $instance = new \Controllers\OrdersCtrl(); 
         $result = $instance->itemsByOrderId($id); 
    });
    $app->get('/v1/search_orders/:search_text', function ($search_text) use($app) {
         $instance = new \Controllers\OrdersCtrl(); 
         $result = $instance->search($search_text); 
    });
    $app->post('/v1/orders', function () use($app) {
         $instance = new \Controllers\OrdersCtrl(); 
         $result = $instance->createOrder(); 
    });

    //Order Items
    $app->post('/v1/order_item', function () use($app) {
         $instance = new \Controllers\OrderItemCtrl(); 
         $result = $instance->createOrderItem(); 
    });
    //product categories v1

    $app->get('/v1/categories', function () use($app) {
         $instance = new \Controllers\CategoriesCtrl(); 
         $result = $instance->Categories(); 
    });
    $app->get('/v1/categories/:id', function ($id) use($app) {
         $instance = new \Controllers\CategoriesCtrl(); 
         $result = $instance->findById($id); 
    });
    $app->post('/v1/categories/', function () use($app) {
         $instance = new \Controllers\CategoriesCtrl(); 
         $result = $instance->createCategory(); 
    });
    $app->post('/v1/categories_update/:id', function ($id) use($app) {
         $instance = new \Controllers\CategoriesCtrl(); 
         $result = $instance->updateCategory($id); 
    });
    $app->post('/v1/categories_delete/:id', function ($id) use($app) {
         $instance = new \Controllers\CategoriesCtrl(); 
         $result = $instance->deleteCategory($id); 
    });

    //Profile 
    $app->get('/v1/setting/:id', function ($id) use($app) {
         $instance = new \Controllers\SettingCtrl(); 
         $result = $instance->getSetting($id); 
    });
    $app->post('/v1/setting_login/', function () use($app) {
         $instance = new \Controllers\SettingCtrl(); 
         $result = $instance->login(); 
    });
    $app->post('/v1/setting_update/:id', function ($id) use($app) {
         $instance = new \Controllers\SettingCtrl(); 
         $result = $instance->updateSetting($id); 
    });

    $app->run();
