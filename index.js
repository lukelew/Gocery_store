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

// quantitiy buttion
var addButton = document.querySelector('#add_button');
var reduceButton = document.querySelector('#reduce_button');
var quantityNum = document.querySelector('#quantity_number');

function addQuantity(){
	quantityNum.value = Number(quantityNum.value) + 1;
}

function reduceQuantity(){
	if(quantityNum.value <= 1){
		return false;
	}
	else{
		quantityNum.value = Number(quantityNum.value) - 1;
	}
	
}

addButton.onclick = addQuantity;
reduceButton.onclick = reduceQuantity;

// quantityNum.addEventListener('focus',function(e){
// 	curValue = quantityNum.value;
// })
// quantityNum.addEventListener('change',function(e){
// 	curValue = quantityNum.value;
// 	if(quantityNum.value<0){
// 		quantityNum.value = curValue;
// 		return false;
// 	}
// })