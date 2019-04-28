<?php
	include 'json_encode.php';
	include 'json_decode.php';

	session_start();

	$rws_post = $GLOBALS['HTTP_RAW_POST_DATA'];
	$form_data = json_decode($rws_post);

	$to = $form_data['email'];
	$subject = "Thanks for shopping!";
	$message = "Dear ".$form_data['name']."\r\n";
	$message .= "We have already received your order.\r\n";
	$message .= "Your address is ".$form_data['address']." ".$form_data['suburb']." ".$form_data['state']."\r\n";
	$message .="Please wait for your order delivered.\r\n";
	$message .="\r\n^_^";

	$from = "Gocery_Store@student.uts.edu.au";
	$headers = "From: $from";
	mail($to,$subject,$message,$headers);
	
	echo "Mail Sent.";

?>