<?php
	ini_set('display_errors', 'On');
	error_reporting(E_ALL | E_STRICT);

	include 'json_decode.php';
	
	session_start();

	$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

	if ($contentType === "application/json") {
	  //Receive the RAW post data.
	  $content = trim(file_get_contents("php://input"));

	  $decoded = json_decode($content, true);

	  echo $decoded['counts'];

	  $_SESSION['products'] = $decoded['counts'];

	}




	$_SESSION['view'] = 1;

	foreach ($_SESSION as $key => $value) {
		echo $key.'  '.$value;
	}
	echo "number is:".$_SESSION['products'];

?>