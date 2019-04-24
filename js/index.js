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
			fetch('addToCart.php', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Origin": "*"
				},
				body: JSON.stringify(_this.state)
			}).then(function (res) {
				// console.log(res);
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

	function Cart_table() {
		_classCallCheck(this, Cart_table);

		return _possibleConstructorReturn(this, (Cart_table.__proto__ || Object.getPrototypeOf(Cart_table)).apply(this, arguments));
	}

	_createClass(Cart_table, [{
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
					React.createElement(
						'tr',
						null,
						React.createElement(
							'td',
							null,
							'cheddar cheese'
						),
						React.createElement(
							'td',
							null,
							'500 gram'
						),
						React.createElement(
							'td',
							null,
							'8.00'
						),
						React.createElement(
							'td',
							null,
							'4'
						),
						React.createElement(
							'td',
							null,
							'32.00'
						)
					)
				)
			);
		}
	}]);

	return Cart_table;
}(React.Component);

ReactDOM.render(React.createElement(Cart_table, null), document.querySelector('#cart_table'));