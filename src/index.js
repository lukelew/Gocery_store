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

// Update the cart when refreshing the page
fetch('updateCart.php',{
	method: 'POST',
	headers: {
		"Content-Type": "application/json; charset=utf-8",                                                                                                
		"Access-Control-Origin": "*"
	},
	body: ''
})
.then((res) => {
	res.json().then(function(data){
		ReactDOM.render(
			<Cart_table ref={(Cart_table) => {window.Cart_table = Cart_table}}/>,
			document.querySelector('#cart_table_box')
		)
		window.Cart_table.updateCart(data);
	})
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
  	if(this.state.counts <= 1){
  		this.setState({
  			counts: 1
  		})
  	}
  	else{
  		this.setState({
  			counts: Number(this.state.counts) - 1
  		})
  	}
  	
  }

  addQuantity = () => {
  	if(this.state.counts >= 20){
  		this.setState({
  			counts: 20
  		})
  		warningBox("You can't buy more than 20 one time")
  	}
  	else{
  		this.setState({
  			counts: Number(this.state.counts) + 1
  		})
  	}
  }

  changeHanlder = (e) => {
  	this.setState({
  		counts: e.target.value
  	})
  }

  sendData = () => {
  	fetch('updateCart.php',{
  		method: 'POST',
  		headers: {
	  		"Content-Type": "application/json; charset=utf-8",                                                                                                
	  		"Access-Control-Origin": "*"
	  	},
  		body:  JSON.stringify(this.state)
  	})
  	.then((res) => {
  		res.json().then(function(data){
  			ReactDOM.render(
  				<Cart_table ref={(Cart_table) => {window.Cart_table = Cart_table}}/>,
  				document.querySelector('#cart_table_box')
  			)
  			window.Cart_table.updateCart(data);
  		})
  		
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
					<p>Quantity</p>
					<a id="reduce_button" onClick={this.reduceQuantity}><i className="fas fa-minus"></i></a>
					<input id="quantity_number" type="number" onChange={this.changeHanlder.bind(this)} value={this.state.counts}/>
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
	constructor(props){
		super(props);
		this.state = {
			list: []
		}
	}

	updateCart(data){
		this.setState({
			list: data
		})
	}

	componentDidMount(){
		checkOut();
	}

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
					{
						this.state.list.map((item, index) => {
							return(
								<Cart_list 
										product_name={item.product_name}
										unit_quantity={item.unit_quantity}
										unit_price={item.unit_price}
										counts={item.counts}
										total_price={Math.floor(item.counts*item.unit_price*100)/100}
										key={index}
								/>)
						})			
					}
				</tbody>
			</table>
		)
	}
}

class Cart_list extends React.Component {
	render() {
		return(
			<tr>
				<td>{this.props.product_name}</td>
				<td>{this.props.unit_quantity}</td>
				<td>{this.props.unit_price}</td>
				<td>{this.props.counts}</td>
				<td>{this.props.total_price}</td>
			</tr>
		)
	}
}

// Clear the cart
var clearCart = document.querySelector('#clear_cart');
var confirmClear = document.querySelector('#confirm_clear');
var yesButton = document.querySelector('#confirm_clear .yes');
var noButton = document.querySelector('#confirm_clear .no');

clearCart.addEventListener('click', ()=>{
	confirmClear.classList.toggle('active');
})
yesButton.addEventListener('click', ()=>{
	var data = [];
	fetch('clearCart.php')
	.then(()=> {
		ReactDOM.render(
			<Cart_table ref={(Cart_table) => {window.Cart_table = Cart_table}}/>,
			document.querySelector('#cart_table_box')
		)
		window.Cart_table.updateCart(data)
	})
	.then(()=>{
		confirmClear.classList.toggle('active')
	})
})
noButton.addEventListener('click', ()=>{
	confirmClear.classList.toggle('active');
})

class Order_list extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			list: [],
			orderPrice: 0
		}
	}

	componentDidMount() {
		fetch('getOrder.php')
		.then(res => res.json())
		.then(data => this.setState({list:data}))
		.then(() => {
			this.state.list.map((item) => {
				this.setState({
					orderPrice: this.state.orderPrice += item.counts*item.unit_price
				})
			})
			var fixedPrice = this.state.orderPrice;
			this.setState({
				orderPrice: fixedPrice.toFixed(2)
			})
		})
		
	}

	render() {
		return(
			<React.Fragment>
				<table>
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
						{
							this.state.list.map((item, index) => {
								return(
									<tr key={index}>
										<td>{item.product_name}</td>
										<td>{item.unit_quantity}</td>
										<td>{item.unit_price}</td>
										<td>{item.counts}</td>
										<td>{Math.floor(item.counts*item.unit_price*100)/100}</td>
									</tr>
								)
							})			
						}
						
					</tbody>
				</table>
				<div id="total_price">
					<p>Order Total Price:</p>
					<strong>{this.state.orderPrice}</strong>
				</div>
			</React.Fragment>
		)
	}
}


// Check out 
function checkOut(){
	var checkout = document.querySelector('#check_out');
	var cartTableBody = document.querySelector('#cart_table tbody');
	var popLayer = document.querySelector('#pop_layer');
	var closeOrder = document.querySelector('#pop_layer .close');
	var warningForm = document.querySelector('#user_form .warning');

	checkout.addEventListener('click', ()=>{
		if(cartTableBody.hasChildNodes()){
			popLayer.classList.toggle('active');
			ReactDOM.render(
				<Order_list/>,
				document.querySelector('#order_list')
			)
		}
		else{
			warningBox('Oops! There are no products in your cart');
		}
	})

	closeOrder.addEventListener('click', ()=>{
		popLayer.classList.toggle('active');
		warningForm.classList.remove('active');
		ReactDOM.unmountComponentAtNode(
			document.querySelector('#order_list')
		)
	})
}

function warningBox(text){
	var warningBox = document.querySelector('#warning');
	var contentBox = document.querySelector('#warning strong');

	contentBox.innerText = text;
	warningBox.classList.add('active');

	var toggleWarning = function(){
		warningBox.classList.remove('active');
	}

	clearTimeout(toggleWarning);
	setTimeout(toggleWarning, 3000);
}



// Validate the form
function validateForm(){
	var popLayer = document.querySelector('#pop_layer');
	var name = document.querySelector("input[name='name']");
	var address = document.querySelector("input[name='address']");
	var suburb = document.querySelector("input[name='suburb']");
	var state = document.querySelector("input[name='state']");
	var country = document.querySelector("input[name='country']");
	var email = document.querySelector("input[name='email']");
	var warningForm = document.querySelector('#user_form .warning');
	

	function warningInfo(text){	
		var warningSpan = document.querySelector('#user_form .warning span');
		warningForm.classList.add('active');
		warningSpan.innerText = text;
	}

	function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
	}

	if(name.value == ''){
		warningInfo('You should input your name');
		return false;
	}
	else if(address.value == ''){
		warningInfo('You should input your address');
		return false;
	}
	else if(suburb.value == ''){
		warningInfo('You should input your suburb');
		return false;
	}
	else if(state.value == ''){
		warningInfo('You should input your state');
		return false;
	}
	else if(country.value == ''){
		warningInfo('You should input your country');
		return false;
	}
	else if(email.value == ''){
		warningInfo('You should input your email');
		return false;
	}
	else if(!validateEmail(email.value)){
		warningInfo('Invalidate email address');
		return false;
	}
	else{
		warningForm.classList.remove('active');
		var formData = {
			name: name.value,
			address: address.value,
			suburb: suburb.value,
			state: state.value,
			country: country.value,
			email: email.value
		}
		fetch('sendemail.php', {
  		method: 'POST',
  		headers: {
	  		"Content-Type": "application/json; charset=utf-8",                                                                                                
	  		"Access-Control-Origin": "*"
	  	},
  		body:  JSON.stringify(formData)
  	})
  	.then((res)=>{
  		popLayer.classList.toggle('active');
  		warningForm.classList.remove('active');
  		ReactDOM.unmountComponentAtNode(
  			document.querySelector('#order_list')
  		)
  		fetch('clearCart.php')
  		.then(()=> {
  			var data = [];
  			ReactDOM.render(
  				<Cart_table ref={(Cart_table) => {window.Cart_table = Cart_table}}/>,
  				document.querySelector('#cart_table_box')
  			)
  			window.Cart_table.updateCart(data)
  		})
  		.then(()=>{
  			successLayer.classList.add('active');
  		})
  	})
		
	}
}

var purchaseButton = document.querySelector('#purchase_button');
purchaseButton.addEventListener('click', ()=>{
	validateForm();
})

var successLayer = document.querySelector('#success_lay');
var successButton = document.querySelector('#success_lay span');
successButton.addEventListener('click', ()=>{
	successLayer.classList.remove('active');
})