<?php
	ini_set('display_errors', 'On');
	include 'json_encode.php';
	include 'json_decode.php';
	
	session_start();

	$rws_post = $GLOBALS['HTTP_RAW_POST_DATA'];
	$new_data = json_decode($rws_post);
	$new_id = $new_data['product_id'];
	$new_count = $new_data['counts'];

	if(empty($_SESSION['cart'])){
		$_SESSION['cart'] = array();
	}
	if(!empty($new_data)){
		foreach ($_SESSION['cart'] as $index => $eachLine) {
			foreach ($eachLine as $key => $value) {
				if($new_id == $value){
					$exsit_id = $index;
				}
			}
		}
		if(isset($exsit_id)){
			$_SESSION['cart'][$exsit_id]['counts'] += $new_count;
		}
		else{
			array_push($_SESSION['cart'], $new_data);
		}
	}

	echo json_encode($_SESSION['cart']);
?>