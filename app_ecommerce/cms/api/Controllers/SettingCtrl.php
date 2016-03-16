<?php 

namespace Controllers; 

class SettingCtrl extends Controllers{
	function __construct()
    {
    	parent::__construct("setting");
    }
	public function getSetting($id){
		$this->findItem($id);
	}
	public function updateSetting($id){
		$this->updateItem($id);
	}
	public function login(){
		$app = new \Slim\Slim(); 
		$objData = json_decode($app->request()->getBody(), true);
		$result = $this->database->has("setting", [
			'AND' =>[
			"username[=]" => $objData['username'], 
			"password[=]" => $objData['password'], 
			]
		]); 
		if($result == true)
		{
			$result_setting = $this->database->get("setting","*", [
				"username" => $objData['username']
			]);	
			echo json_encode($result_setting, true);
		}
		else
			echo json_encode($result, true);
		

		
	}
}