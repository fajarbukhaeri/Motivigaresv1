<?php 


namespace Controllers; 


class Controllers extends \Slim\Slim{
	protected $database, $entity_name;
    public function __construct($entity_name_param)
    {
        $DbInit = require("DbInit.php");
        $this->database = $DbInit;
        $this->entity_name = $entity_name_param; 
    }
    public function listItems(){
		$result = $this->database->select($this->entity_name,"*"); 
		echo json_encode($result, true); 
	}
	public function findItem($id){
		$result = $this->database->get($this->entity_name,"*", [
			"id" => $id
			]); 
		echo json_encode($result, true); 
		//succ => result 
		//fail => false
	}
	public function createItem(){
		$app = new \Slim\Slim(); 
		$objData = json_decode($app->request()->getBody(), true);
		if(isset($objData)){
			$result = $this->database->insert($this->entity_name, $objData); 	
			echo json_encode($result, true);
		}
		//succ => result (new id number) 
		//fail => null
	}
	public function updateItem($id){
		$app = new \Slim\Slim(); 
		$objData = json_decode($app->request()->getBody(), true);
		if(isset($objData)){
			$result = $this->database->update($this->entity_name, $objData, ["id" => $id]); 	
			if($result == 0)
				echo 'false'; 
			else
				echo 'true'; 
		}
	}
	public function deleteItem($id){
		$result = $this->database->delete($this->entity_name, ["id" => $id]); 
		if($result == 0)
			echo 'false'; 
		else
			echo 'true'; 
	}
}