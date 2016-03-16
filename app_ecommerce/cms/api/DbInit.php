<?php
	require "Medoo/medoo.php"; 

	//your database options
	$DbInit = new medoo([
	'database_type' => 'mysql',
	'database_name' => 'motiviga',
	'server' => 'localhost',
	'username' => 'root',
	'password' => 'admin',
	]);
	
	//Return 
	return $DbInit;