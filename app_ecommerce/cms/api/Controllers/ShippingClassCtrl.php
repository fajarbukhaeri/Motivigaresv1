<?php 

namespace Controllers; 

class ShippingClassCtrl extends Controllers{
	function __construct()
    {
    	parent::__construct("shipping_class");
    }
	public function ShippingClasses(){
		$this->listItems();
	}
	public function findById($id){
		$this->findItem($id);
	}
	public function createShipping(){
		$this->createItem();
	}
	public function updateShipping($id){
		$this->updateItem($id);
	}
	public function deleteShipping($id){
		$this->deleteItem($id);
	}
}