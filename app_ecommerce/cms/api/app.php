<?php
	\Slim\Slim::registerAutoloader();
	$app = new \Slim\Slim(array(
           'mode' => 'development'
     ));
	return $app; 