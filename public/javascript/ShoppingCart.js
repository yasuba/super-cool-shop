function ShoppingCart() {
  this.contents = [];
}

ShoppingCart.prototype.add = function(product){
  if(product.name === 'voucher')  {
    if(this.categories().indexOf('voucher') === -1) {
      this.addVoucher(product);
    } else {
      throw new Error("You've already added a voucher");
    }
  }
  if(this.checkStock(product) === 0) {
    throw new Error("That item is out of stock");
  }
  this.reduceStock(product);
  return this.contents.push(product);
};

ShoppingCart.prototype.addVoucher = function(product){
  if(product.type === 'fiver' && this.balance() < 5.00) {
    throw new Error("Your order must be over £5");
  }
  if(product.type === 'tenner' && this.balance() < 50.00) {
    throw new Error("Your order must be over £50");
  } else if(product.type === 'fifteen' && this.balance() < 75.00 || product.type === 'fifteen' && this.hasShoes() === 0) {
  throw new Error("You must have bought at least one footwear item and spent over £75");
  }
}

ShoppingCart.prototype.hasShoes = function(){
  var shoes = [];
  for(i = 0; i < this.contents.length; i++) {
    if(this.contents[i].category.indexOf('footwear') !== -1) {
      shoes.push(this.contents[i]);
    }
  }
  return shoes.length;
};

ShoppingCart.prototype.remove = function(product){
  var index = this.contents.indexOf(product);
  if (index > -1) {
    this.contents.splice(index, 1);
  }
  this.replaceStock(product)
  return this.contents;
};


ShoppingCart.prototype.balance = function(){
  var price = 0;
  for(i=0; i< this.contents.length; i++){
    price += this.contents[i].price
  }
  return price;
};


ShoppingCart.prototype.checkStock = function(product){
  return product.quantity;
};

ShoppingCart.prototype.reduceStock = function(product){
  product.quantity --;
};

ShoppingCart.prototype.replaceStock = function(product){
  product.quantity ++;
};

ShoppingCart.prototype.categories = function(){
  var categories = [];
  for(i=0; i<this.contents.length; i++){
    categories.push(this.contents[i].category);
  }
  return categories;
};