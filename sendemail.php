<?php
	include 'json_encode.php';
	include 'json_decode.php';

	session_start();

	$rws_post = $GLOBALS['HTTP_RAW_POST_DATA'];
	$form_data = json_decode($rws_post);

	$to = $form_data['email'];
	$subject = "Thanks for shopping!";

	$message = "<html><body>";
	$message .= "<p>Dear ".$form_data['name']."</p>";
	$message .= "<p>We have already received your order.</p>";
	$message .= "<p>Your address is: <strong>".$form_data['address']." ".$form_data['suburb']." ".$form_data['state']."</strong></p>";
	$message .= "<table><tr style='text-align:left;color: #ffffff;background: #42ccb5;'><th style='padding:5px 20px'>Product Name</th><th style='padding:5px 20px'>Unit Quantity</th><th style='padding:5px 20px'>Unit Price</th><th style='padding:5px 20px'>Quantity</th></tr>";
	$message .= "<p>Your products are:</p>";

	for($i=0; $i< count($_SESSION['cart']); $i++){
		$message .= "<tr>";
		$message .= "<td>".$_SESSION['cart'][$i]['product_name'];
		$message .= "</td><td>".$_SESSION['cart'][$i]['unit_quantity'];
		$message .= "</td><td>".$_SESSION['cart'][$i]['unit_price'];
		$message .= "</td><td>".$_SESSION['cart'][$i]['counts'];
		$message .= "</tr>";
	}

	$message .= "</table>";
	$message .= "<p>Please wait for your order delivered.</p>";
	$message .= "<p>^_^</p>";
	$message .= '</body></html>';


	$from = "Gocery_Store@student.uts.edu.au";
	$headers = "From: $from";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html";

	mail($to,$subject,$message,$headers);
	
	echo "Mail Sent.";

?>