<?php 

namespace Controllers; 

class CategoriesCtrl extends Controllers{
	function __construct()
    {
    	parent::__construct("categories");
    }
	public function Categories(){
		$this->listItems();
	}
	public function findById($id){
		$this->findItem($id);
	}
	public function createCategory(){
		$this->createItem();
	}
	public function updateCategory($id){
		$this->updateItem($id);
	}
	public function deleteCategory($id){
		$this->deleteItem($id);
	}
}