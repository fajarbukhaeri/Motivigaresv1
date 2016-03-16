<?php 

namespace Controllers; 

class ProductSpecCtrl extends Controllers{
	function __construct()
    {
    	parent::__construct("product_spec");
    }
	public function SpecList(){
		$this->listItems();
	}
	public function findById($id){
		$this->findItem($id);
	}
	public function createSpec(){
		$this->createItem();
	}
	public function updateSpec($id){
		$this->updateItem($id);
	}
	public function deleteSpec($id){
		$this->deleteItem($id);
	}
}