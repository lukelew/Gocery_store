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

// update the cart when refreshing the page
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
			} }), document.querySelector('#cart_table'));
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
			if (_this.state.counts == 1) {
				_this.setState({
					counts: 1
				});
			} else {
				_this.setState({
					counts: _this.state.counts - 1
				});
			}
		};

		_this.addQuantity = function () {
			_this.setState({
				counts: _this.state.counts + 1
			});
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
						} }), document.querySelector('#cart_table'));
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
						'a',
						{ id: 'reduce_button', onClick: this.reduceQuantity },
						React.createElement('i', { className: 'fas fa-minus' })
					),
					React.createElement('input', { id: 'quantity_number', type: 'number', onChange: this.changeHanlder.bind(this), value: this.state.counts, maxLength: '5' }),
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
						{ onClick: this.sendData },
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
			} }), document.querySelector('#cart_table'));
		window.Cart_table.updateCart(data);
	}).then(function () {
		confirmClear.classList.toggle('active');
	});
});
noButton.addEventListener('click', function () {
	confirmClear.classList.toggle('active');
});