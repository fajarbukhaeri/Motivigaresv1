<?php 

namespace Controllers; 

class OrdersCtrl extends Controllers{
	function __construct()
    {
    	parent::__construct("orders");
    }
	public function Orders(){
		$this->listItems();
	}
	public function findById($id){
		$this->findItem($id);
	}
	public function createOrder(){
		$this->createItem();
	}
	public function itemsByOrderId($id){
		$result = $this->database->select("order_item","*", [
			"order_id" => $id
			]); 
		echo json_encode($result, true); 
	}
	public function search($search_text){
		$result = $this->database->query('SELECT * ' . 
			'FROM orders WHERE customer_email_address LIKE'. "'" . $search_text . "%'")->fetchAll(); 
		echo json_encode($result, true); 
	}
	
}