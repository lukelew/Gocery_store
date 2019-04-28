<?php
	ini_set('display_errors', 'On');
	include 'json_encode.php';
	include 'json_decode.php';

	session_start();

	echo json_encode($_SESSION['cart']);
?>