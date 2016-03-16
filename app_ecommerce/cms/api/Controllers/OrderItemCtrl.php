<?php 

namespace Controllers; 

class OrderItemCtrl extends Controllers{
	function __construct()
    {
    	parent::__construct("order_item");
    }
	public function createOrderItem(){
		$this->createItem();
	}
	
}