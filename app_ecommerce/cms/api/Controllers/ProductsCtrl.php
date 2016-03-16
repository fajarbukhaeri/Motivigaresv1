<?php 

namespace Controllers; 

class ProductsCtrl extends Controllers{
	function __construct()
    {
    	parent::__construct("products");
    }
	public function productsList($offset, $limit){
		$result = $this->database->query("SELECT * FROM products LIMIT " . $offset . "," . $limit)->fetchAll();; 
		echo json_encode($result, true); 
	}
	public function findById($id){
		$this->findItem($id);
	}
	public function createProduct(){
		$this->createItem();
	}
	public function updateProduct($id){
		$this->updateItem($id);
	}
	public function countProducts(){
		$count = $this->database->count("products"); 
		echo $count; 
	}
	public function deleteProduct($id){
		$result = $this->database->select("products","images", [
			"id" => $id
			]); 
		$res = json_decode($result[0], true);
		for($i=0;$i<count($res);$i++){
			//del image
			$path = 'uploads/' . $res[$i];
			if (file_exists($path)) {
	    		unlink($path);
	    	}
		}
		//delete product 
		$this->deleteItem($id);
	}
	public function findByCategoryId($id){
		$result = $this->database->query("SELECT * FROM products WHERE categories_id = " . $id)->fetchAll();; 
		echo json_encode($result, true); 
	}
	public function searchByName($search_text){
		$result = $this->database->query('SELECT id,name,new_price,old_price,images,description ' . 
			'FROM products WHERE name LIKE'. "'" . $search_text . "%'"
			. ' OR description LIKE '."'" . $search_text . "%'" )->fetchAll(); 
		echo json_encode($result, true); 
	}
	public function uploadImage(){
		if (!isset($_FILES['image'])) {
	        echo json_encode('false', true);
	        return; 
    	}
    	$filename = uniqid('img-'.date('Ymd').'-')  . '.' . pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION);;
		if(move_uploaded_file($_FILES['image']['tmp_name'], 'uploads/' . $filename)){
			echo json_encode($filename, true);
		}
		else
			echo json_encode('false', true);
    		 
	}
	public function removeImage($src){
		$path = 'uploads/' . $src; 
		if (file_exists($path)) {
    		unlink($path);
    		echo json_encode('true', true);
    	}
    	else
    		echo json_encode('false', true);
	}
}