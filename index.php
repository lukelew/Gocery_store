<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Gocery store</title>
	<link rel="stylesheet" href="index.css">
	<link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet">
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
</head>
<body>
	<div id="wrap">
		<div id="left">
			<div id="catgory">
				<div id="level1">
					<div class="block lv1"><i class="fas fa-store"></i> Gocery Store</div>
				</div>
				<div id="level2">
					<div class="block lv2" data-target="frozen_food">Frozen Food</div>
					<div class="block lv2" data-target="fresh_food">Fresh Food</div>
					<div class="block lv2" data-target="beverages">Beverages</div>
					<div class="block lv2" data-target="home_health">Home Health</div>
					<div class="block lv2" data-target="pet_food">Pet Food</div>
				</div>
				<div id="level3">
					<!-- frozen_food area -->
					<div id="frozen_food" class="level3_box">
						<div class="level3">
							<div class="block">Hamburger Patties</div>
							<div class="block">FishFingers</div>
							<div class="block">Shelled Prawns</div>
							<div class="block">Tub Ice Cream</div>
						</div>
						<div class="level4">
							<div class="block">500 Gram</div>
							<div class="block">1000Gram</div>
							<div class="block">1 Litre</div>
							<div class="block">2 Litre</div>
						</div>
					</div>
					<!-- fresh_food area -->
					<div id="fresh_food" class="level3_box">
						<div class="level3">
							<div class="block">T'Bone<br>Steak</div>
							<div class="block">Cheddar<br>Cheese</div>
							<div class="block">Navel<br>Oranges</div>
							<div class="block">Bananas</div>
							<div class="block">Grapes</div>
							<div class="block">Apples</div>
							<div class="block">Peaches</div>
						</div>
						<div class="level4">
							<div class="block">500 Gram</div>
							<div class="block">1000 Gram</div>
						</div>
					</div>
					<!-- beverages area -->
					<div id="beverages" class="level3_box">
						<div class="level3">
							<div class="block">Coffee</div>
							<div class="block">Earl Grey Tea Bags</div>
							<div class="block">Chocolate Bar</div>
						</div>
						<div class="level4">
							<div class="block">200 Gram</div>
							<div class="block">500 Gram</div>
							<div class="block">Pack 25</div>
							<div class="block">Pack 100</div>
							<div class="block">Pack 200</div>
						</div>
					</div>
					<!-- home_health area -->
					<div id="home_health" class="level3_box">
						<div class="level3">
							<div class="block">Bath Soap</div>
							<div class="block">Panadol</div>
							<div class="block">Washing Powder</div>
							<div class="block">Garbage Bags</div>
							<div class="block">Laundry Bleach</div>
						</div>
						<div class="level4">
							<div class="block">Pack 24</div>
							<div class="block">Bottle 50</div>
							<div class="block">small (pack 10)</div>
							<div class="block">large (pack 50)</div>
						</div>
					</div>
					<!-- pet_food area-->
					<div id="pet_food" class="level3_box">
						<div class="level3">
							<div class="block">Bird Food</div>
							<div class="block">Cat Food</div>
							<div class="block">Dry Dog Food</div>
							<div class="block">Fish Food</div>
						</div>
						<div class="level4">
							<div class="block">1 kg.Pack</div>
							<div class="block">5 kg.Pack</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="right">
			<div id="top">
				<h2>here is the detail of the product</h2>
				<div id="product_detail">
					<img src="images/cheddar.jpg" alt="cheddar cheese">
					<h3>cheddar cheese 1000 Gram</h3>
					<dl class="info">
						<dt>Unit Price</dt>
						<dd>8.00</dd>
						<dt>Unit Quantity</dt>
						<dd>500 gram</dd>
						<dt>In Stock</dt>
						<dd>1000</dd>
					</dl>
					<div id="quantity">
						<a id="reduce_button" href="javascript:void(0);"><i class="fas fa-minus"></i></a>
						<input id="quantity_number" type="number" value="1" maxlength="5">
						<a id="add_button" href="javascript:void(0);"><i class="fas fa-plus"></i></a>
					</div>
					<a href="javascript:void(0);" id="add_to_cart">Add to Cart</a>
				</div>

			</div>
			<div id="bottom">

			</div>
		</div>
	</div>

<?php
	// ini_set('display_errors', 1);

	// $connect = mysqli_connect("rerun.it.uts.edu.au","potiro","pcXZb(kL","poti");
	// if (!$connect)
	//    die("Could not connect to Server");
	 
	// $query_string = "select * from products";
	// $result = mysqli_query($connect, $query_string);
	// $num_rows = mysqli_num_rows($result);

	// if ($num_rows > 0 ) {
	// //Get the rows from the table
	// 	while ( $a_row = mysqli_fetch_row($result) ) {
	// //get the columns in each row
	// 		foreach ($a_row as $field)
	// 			echo '<script>'.'var js_arr ='.$field .'</script>';
	// 	}
	// }

	// echo $num_rows;
	// mysqli_close($connect);
?>
<script src="index.js"></script>
</body>
</html>