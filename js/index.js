var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*---Gocery Store---*/
/*---Internet Programming Assignment1---*/
/*---Qun Lu---*/
/*---13298498---*/

import { imgList } from './imgList.js';

// Menu Tree
var blockLv2 = document.querySelectorAll('.lv2');
var level3Box = document.querySelectorAll('.level3_box');

blockLv2.forEach(function (e) {
	var curBlock = this;
	e.onmouseover = function () {
		var target = this.dataset.target;
		level3Box.forEach(function (item) {
			item.classList.remove('active');
		});
		document.querySelector('#' + target).classList.add('active');
	};
});

// Update the cart when refreshing the page
fetch('updateCart.php', {
	method: 'POST',
	headers: {
		"Content-Type": "application/json; charset=utf-8",
		"Access-Control-Origin": "*"
	},
	body: ''
}).then(function (res) {
	res.json().then(function (data) {
		ReactDOM.render(React.createElement(Cart_table, { ref: function ref(Cart_table) {
				window.Cart_table = Cart_table;
			} }), document.querySelector('#cart_table_box'));
		window.Cart_table.updateCart(data);
	});
});

// Send getproduct request
var catgory = document.querySelector('#catgory');

catgory.addEventListener('click', function (e) {
	if (e.target.classList.contains('block') && e.target.dataset.id) {
		var imgName = imgList[e.target.dataset.id];

		// Fetch product detail
		fetch('getProduct.php?product_id=' + e.target.dataset.id).then(function (res) {
			res.json().then(function (data) {
				ReactDOM.render(React.createElement(Product_detail, { ref: function ref(Product_detail) {
						window.Product_detail = Product_detail;
					} }), document.querySelector('#product_detail'));
				window.Product_detail.updateInfo(imgName, data);
			});
		}).catch(function () {
			console.log('error');
		});
	}
});

// Product_detail components

var Product_detail = function (_React$Component) {
	_inherits(Product_detail, _React$Component);

	function Product_detail(props) {
		_classCallCheck(this, Product_detail);

		var _this = _possibleConstructorReturn(this, (Product_detail.__proto__ || Object.getPrototypeOf(Product_detail)).call(this, props));

		_this.reduceQuantity = function () {
			if (_this.state.counts <= 1) {
				_this.setState({
					counts: 1
				});
			} else {
				_this.setState({
					counts: Number(_this.state.counts) - 1
				});
			}
		};

		_this.addQuantity = function () {
			if (_this.state.counts >= 20) {
				_this.setState({
					counts: 20
				});
				warningBox("You can't add more than 20 one time");
			} else {
				_this.setState({
					counts: Number(_this.state.counts) + 1
				});
			}
		};

		_this.changeHanlder = function (e) {
			_this.setState({
				counts: e.target.value
			});
		};

		_this.sendData = function () {
			fetch('updateCart.php', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json; charset=utf-8",
					"Access-Control-Origin": "*"
				},
				body: JSON.stringify(_this.state)
			}).then(function (res) {
				res.json().then(function (data) {
					ReactDOM.render(React.createElement(Cart_table, { ref: function ref(Cart_table) {
							window.Cart_table = Cart_table;
						} }), document.querySelector('#cart_table_box'));
					window.Cart_table.updateCart(data);
				});
			});
		};

		_this.state = {
			product_id: "",
			product_name: "",
			unit_price: "",
			unit_quantity: "",
			in_stock: "",
			counts: 1
		};
		return _this;
	}

	_createClass(Product_detail, [{
		key: 'updateInfo',
		value: function updateInfo(img, data) {
			this.setState({
				img: img,
				counts: 1
			});
			this.setState(data);
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				React.Fragment,
				null,
				React.createElement(Product_info, {
					img: this.state.img,
					product_name: this.state.product_name,
					unit_price: this.state.unit_price,
					unit_quantity: this.state.unit_quantity,
					in_stock: this.state.in_stock
				}),
				React.createElement(
					'div',
					{ id: 'quantity_button' },
					React.createElement(
						'p',
						null,
						'Quantity'
					),
					React.createElement(
						'a',
						{ id: 'reduce_button', onClick: this.reduceQuantity },
						React.createElement('i', { className: 'fas fa-minus' })
					),
					React.createElement('input', { id: 'quantity_number', type: 'number', onChange: this.changeHanlder.bind(this), value: this.state.counts }),
					React.createElement(
						'a',
						{ id: 'add_button', onClick: this.addQuantity },
						React.createElement('i', { className: 'fas fa-plus' })
					)
				),
				React.createElement(
					'div',
					{ id: 'add_to_cart' },
					React.createElement(
						'a',
						{ className: 'green_btn', onClick: this.sendData },
						'Add to Cart'
					)
				)
			);
		}
	}]);

	return Product_detail;
}(React.Component);

// Product_info components


var Product_info = function (_React$Component2) {
	_inherits(Product_info, _React$Component2);

	function Product_info() {
		_classCallCheck(this, Product_info);

		return _possibleConstructorReturn(this, (Product_info.__proto__ || Object.getPrototypeOf(Product_info)).apply(this, arguments));
	}

	_createClass(Product_info, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ id: 'product_info' },
				React.createElement('img', { src: "images/" + this.props.img + ".jpg" }),
				React.createElement(
					'h3',
					null,
					this.props.product_name
				),
				React.createElement(
					'dl',
					{ className: 'info' },
					React.createElement(
						'dt',
						null,
						'Unit Price'
					),
					React.createElement(
						'dd',
						null,
						this.props.unit_price
					),
					React.createElement(
						'dt',
						null,
						'Unit Quantity'
					),
					React.createElement(
						'dd',
						null,
						this.props.unit_quantity
					),
					React.createElement(
						'dt',
						null,
						'In Stock'
					),
					React.createElement(
						'dd',
						null,
						this.props.in_stock
					)
				)
			);
		}
	}]);

	return Product_info;
}(React.Component);

// Cart_table components


var Cart_table = function (_React$Component3) {
	_inherits(Cart_table, _React$Component3);

	function Cart_table(props) {
		_classCallCheck(this, Cart_table);

		var _this3 = _possibleConstructorReturn(this, (Cart_table.__proto__ || Object.getPrototypeOf(Cart_table)).call(this, props));

		_this3.state = {
			list: []
		};
		return _this3;
	}

	_createClass(Cart_table, [{
		key: 'updateCart',
		value: function updateCart(data) {
			this.setState({
				list: data
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			checkOut();
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'table',
				{ id: 'cart_table' },
				React.createElement(
					'thead',
					null,
					React.createElement(
						'tr',
						null,
						React.createElement(
							'th',
							null,
							'Product Name'
						),
						React.createElement(
							'th',
							null,
							'Unit Quantity'
						),
						React.createElement(
							'th',
							null,
							'Unit Price'
						),
						React.createElement(
							'th',
							null,
							'Quantity'
						),
						React.createElement(
							'th',
							null,
							'Total Price'
						)
					)
				),
				React.createElement(
					'tbody',
					null,
					this.state.list.map(function (item, index) {
						return React.createElement(Cart_list, {
							product_name: item.product_name,
							unit_quantity: item.unit_quantity,
							unit_price: item.unit_price,
							counts: item.counts,
							total_price: Math.floor(item.counts * item.unit_price * 100) / 100,
							key: index
						});
					})
				)
			);
		}
	}]);

	return Cart_table;
}(React.Component);

var Cart_list = function (_React$Component4) {
	_inherits(Cart_list, _React$Component4);

	function Cart_list() {
		_classCallCheck(this, Cart_list);

		return _possibleConstructorReturn(this, (Cart_list.__proto__ || Object.getPrototypeOf(Cart_list)).apply(this, arguments));
	}

	_createClass(Cart_list, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'tr',
				null,
				React.createElement(
					'td',
					null,
					this.props.product_name
				),
				React.createElement(
					'td',
					null,
					this.props.unit_quantity
				),
				React.createElement(
					'td',
					null,
					this.props.unit_price
				),
				React.createElement(
					'td',
					null,
					this.props.counts
				),
				React.createElement(
					'td',
					null,
					this.props.total_price
				)
			);
		}
	}]);

	return Cart_list;
}(React.Component);

// Clear the cart


var clearCart = document.querySelector('#clear_cart');
var confirmClear = document.querySelector('#confirm_clear');
var yesButton = document.querySelector('#confirm_clear .yes');
var noButton = document.querySelector('#confirm_clear .no');

clearCart.addEventListener('click', function () {
	confirmClear.classList.toggle('active');
});
yesButton.addEventListener('click', function () {
	var data = [];
	fetch('clearCart.php').then(function () {
		ReactDOM.render(React.createElement(Cart_table, { ref: function ref(Cart_table) {
				window.Cart_table = Cart_table;
			} }), document.querySelector('#cart_table_box'));
		window.Cart_table.updateCart(data);
	}).then(function () {
		confirmClear.classList.toggle('active');
		warningBox('The cart has been cleared successfully!');
	});
});
noButton.addEventListener('click', function () {
	confirmClear.classList.toggle('active');
});

var Order_list = function (_React$Component5) {
	_inherits(Order_list, _React$Component5);

	function Order_list(props) {
		_classCallCheck(this, Order_list);

		var _this5 = _possibleConstructorReturn(this, (Order_list.__proto__ || Object.getPrototypeOf(Order_list)).call(this, props));

		_this5.state = {
			list: [],
			orderPrice: 0
		};
		return _this5;
	}

	_createClass(Order_list, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this6 = this;

			fetch('getOrder.php').then(function (res) {
				return res.json();
			}).then(function (data) {
				return _this6.setState({ list: data });
			}).then(function () {
				_this6.state.list.map(function (item) {
					_this6.setState({
						orderPrice: _this6.state.orderPrice += item.counts * item.unit_price
					});
				});
				var fixedPrice = _this6.state.orderPrice;
				_this6.setState({
					orderPrice: fixedPrice.toFixed(2)
				});
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				React.Fragment,
				null,
				React.createElement(
					'table',
					null,
					React.createElement(
						'thead',
						null,
						React.createElement(
							'tr',
							null,
							React.createElement(
								'th',
								null,
								'Product Name'
							),
							React.createElement(
								'th',
								null,
								'Unit Quantity'
							),
							React.createElement(
								'th',
								null,
								'Unit Price'
							),
							React.createElement(
								'th',
								null,
								'Quantity'
							),
							React.createElement(
								'th',
								null,
								'Total Price'
							)
						)
					),
					React.createElement(
						'tbody',
						null,
						this.state.list.map(function (item, index) {
							return React.createElement(
								'tr',
								{ key: index },
								React.createElement(
									'td',
									null,
									item.product_name
								),
								React.createElement(
									'td',
									null,
									item.unit_quantity
								),
								React.createElement(
									'td',
									null,
									item.unit_price
								),
								React.createElement(
									'td',
									null,
									item.counts
								),
								React.createElement(
									'td',
									null,
									Math.floor(item.counts * item.unit_price * 100) / 100
								)
							);
						})
					)
				),
				React.createElement(
					'div',
					{ id: 'total_price' },
					React.createElement(
						'p',
						null,
						'Order Total Price:'
					),
					React.createElement(
						'strong',
						null,
						this.state.orderPrice
					)
				)
			);
		}
	}]);

	return Order_list;
}(React.Component);

// Check out 


function checkOut() {
	var checkout = document.querySelector('#check_out');
	var cartTableBody = document.querySelector('#cart_table tbody');
	var popLayer = document.querySelector('#pop_layer');
	var closeOrder = document.querySelector('#pop_layer .close');
	var warningForm = document.querySelector('#user_form .warning');

	checkout.addEventListener('click', function () {
		if (cartTableBody.hasChildNodes()) {
			popLayer.classList.toggle('active');
			ReactDOM.render(React.createElement(Order_list, null), document.querySelector('#order_list'));
		} else {
			warningBox('Oops! There are no products in your cart');
		}
	});

	closeOrder.addEventListener('click', function () {
		popLayer.classList.toggle('active');
		warningForm.classList.remove('active');
		ReactDOM.unmountComponentAtNode(document.querySelector('#order_list'));
	});
}

function warningBox(text) {
	var warningBox = document.querySelector('#warning');
	var contentBox = document.querySelector('#warning strong');

	contentBox.innerText = text;
	warningBox.classList.add('active');

	var toggleWarning = function toggleWarning() {
		warningBox.classList.remove('active');
	};

	clearTimeout(toggleWarning);
	setTimeout(toggleWarning, 3000);
}

// Validate the form
function validateForm() {
	var popLayer = document.querySelector('#pop_layer');
	var name = document.querySelector("input[name='name']");
	var address = document.querySelector("input[name='address']");
	var suburb = document.querySelector("input[name='suburb']");
	var state = document.querySelector("input[name='state']");
	var country = document.querySelector("input[name='country']");
	var email = document.querySelector("input[name='email']");
	var warningForm = document.querySelector('#user_form .warning');

	function warningInfo(text) {
		var warningSpan = document.querySelector('#user_form .warning span');
		warningForm.classList.add('active');
		warningSpan.innerText = text;
	}

	function validateEmail(email) {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	if (name.value == '') {
		warningInfo('You should input your name');
		return false;
	} else if (address.value == '') {
		warningInfo('You should input your address');
		return false;
	} else if (suburb.value == '') {
		warningInfo('You should input your suburb');
		return false;
	} else if (state.value == '') {
		warningInfo('You should input your state');
		return false;
	} else if (country.value == '') {
		warningInfo('You should input your country');
		return false;
	} else if (email.value == '') {
		warningInfo('You should input your email');
		return false;
	} else if (!validateEmail(email.value)) {
		warningInfo('Invalidate email address');
		return false;
	} else {
		warningForm.classList.remove('active');
		var formData = {
			name: name.value,
			address: address.value,
			suburb: suburb.value,
			state: state.value,
			country: country.value,
			email: email.value
		};
		fetch('sendemail.php', {
			method: 'POST',
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				"Access-Control-Origin": "*"
			},
			body: JSON.stringify(formData)
		}).then(function (res) {
			popLayer.classList.toggle('active');
			warningForm.classList.remove('active');
			ReactDOM.unmountComponentAtNode(document.querySelector('#order_list'));
			fetch('clearCart.php').then(function () {
				var data = [];
				ReactDOM.render(React.createElement(Cart_table, { ref: function ref(Cart_table) {
						window.Cart_table = Cart_table;
					} }), document.querySelector('#cart_table_box'));
				window.Cart_table.updateCart(data);
			}).then(function () {
				successLayer.classList.add('active');
			});
		});
	}
}

var purchaseButton = document.querySelector('#purchase_button');
purchaseButton.addEventListener('click', function () {
	validateForm();
});

var successLayer = document.querySelector('#success_lay');
var successButton = document.querySelector('#success_lay span');
successButton.addEventListener('click', function () {
	successLayer.classList.remove('active');
});