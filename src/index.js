/*---Gocery Store---*/ 
/*---Internet Programming Assignment1---*/ 
/*---Qun Lu---*/ 
/*---13298498---*/ 

import {imgList} from './imgList.js';

// Menu Tree
const blockLv2 = document.querySelectorAll('.lv2');
const level3Box = document.querySelectorAll('.level3_box');

blockLv2.forEach(function(e){
	var curBlock = this;
	e.onmouseover = function(){
		var target = this.dataset.target;
		level3Box.forEach(function(item){
			item.classList.remove('active');
		})
		document.querySelector('#'+target).classList.add('active');
	}

})

// Send getproduct request
const catgory = document.querySelector('#catgory');

catgory.addEventListener('click', function(e){
	if(e.target.classList.contains('block') && e.target.dataset.id){
		var imgName = imgList[e.target.dataset.id];

		// Fetch product detail
		fetch('getProduct.php?product_id=' + e.target.dataset.id)
		.then(function(res) {
			res.json().then(function(data) {
				ReactDOM.render(
					<Product_detail ref={(Product_detail) => {window.Product_detail = Product_detail}}/>,
					document.querySelector('#product_detail')
				)
				window.Product_detail.updateInfo(imgName, data);
			});
		})
		.catch(function() {
			console.log('error');
		})
	}
})

// Product_detail components
class Product_detail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			product_id: "",
			product_name: "",
			unit_price: "",
			unit_quantity: "",
			in_stock: "",
			counts: 1
		}
	}

	updateInfo(img, data) {
  	this.setState({
  		img: img,
  		counts: 1
  	})
  	this.setState(data)
  }

  reduceQuantity = () => {
  	if(this.state.counts == 1){
  		this.setState({
  			counts: 1
  		})
  	}
  	else{
  		this.setState({
  			counts: this.state.counts - 1
  		})
  	}
  	
  }

  addQuantity = () => {
  	this.setState({
  		counts: this.state.counts + 1
  	})
  }

  changeHanlder = (e) => {
  	this.setState({
  		counts: e.target.value
  	})
  }

  sendData = () => {
  	fetch('addToCart.php',{
  		method: 'POST',
  		headers: {
	  		"Content-Type": "application/json",                                                                                                
	  		"Access-Control-Origin": "*"
	  	},
  		body:  JSON.stringify(this.state)
  	})
  	.then((res) => {
  		// console.log(res);
  	})
  }

	render() {
		return (
			<React.Fragment>
				<Product_info 
					img={this.state.img}
					product_name={this.state.product_name}
					unit_price={this.state.unit_price}
					unit_quantity={this.state.unit_quantity}
					in_stock={this.state.in_stock}
				/>
				<div id="quantity_button">	
					<a id="reduce_button" onClick={this.reduceQuantity}><i className="fas fa-minus"></i></a>
					<input id="quantity_number" type="number" onChange={this.changeHanlder.bind(this)} value={this.state.counts} maxLength="5"/>
					<a id="add_button" onClick={this.addQuantity}><i className="fas fa-plus"></i></a>
				</div>
				<div id="add_to_cart">
					<a onClick={this.sendData}>Add to Cart</a>	
				</div>
			</React.Fragment>
		)
	}
}

// Product_info components
class Product_info extends React.Component {

	render() {
		return (
			<div id="product_info">
				<img src={"images/"+ this.props.img +".jpg"}/>
				<h3>{this.props.product_name}</h3>
				<dl className="info">
					<dt>Unit Price</dt>
					<dd>{this.props.unit_price}</dd>
					<dt>Unit Quantity</dt>
					<dd>{this.props.unit_quantity}</dd>
					<dt>In Stock</dt>
					<dd>{this.props.in_stock}</dd>
				</dl>
			</div>
		)
	}
}

// Cart_table components
class Cart_table extends React.Component {
	render() {
		return(
			<table id="cart_table">
				<thead>
					<tr>
						<th>Product Name</th>
						<th>Unit Quantity</th>
						<th>Unit Price</th>
						<th>Quantity</th>
						<th>Total Price</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>cheddar cheese</td>
						<td>500 gram</td>
						<td>8.00</td>
						<td>4</td>
						<td>32.00</td>
					</tr>
				</tbody>
			</table>
		)
	}
}

ReactDOM.render(
	<Cart_table/>,
	document.querySelector('#cart_table')
)