<?php
ini_set('display_errors', 1);

include 'json_encode.php';

$link = mysqli_connect("rerun.it.uts.edu.au","potiro","pcXZb(kL","poti");
if (!$link)
   die("Could not connect to Server");
 
$product_id = $_REQUEST['product_id'];
$query_string = "SELECT * FROM products WHERE product_id=".$product_id;
$result = mysqli_query($link, $query_string);
$row = mysqli_fetch_assoc($result);

echo json_encode($row);
mysqli_close($link);
?>