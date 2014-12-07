var cart = new ShoppingCart();
var itemCount = 0;
var fiver = new Voucher('voucher', 'fiver', -5.00);
var tenner = new Voucher('voucher', 'tenner', -10.00);
var fifteen = new Voucher('voucher', 'fifteen', -15.00);

function currencyFormat (num) {
    return "£" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1")
}

$.getJSON('./javascript/data.json', function(data){
  stock = data;

  $('.item .add').on('click', function(event){
    event.preventDefault();
    item = this.parentNode.parentNode.getAttribute('data-name');
    try {cart.add(stock[item]);}
    catch(err) {alert(err)}
    $('#item-count').html(cart.contents.length);
    $('#price').html(currencyFormat(cart.balance()))
  });

  $('.item .remove').on('click', function(event){
    event.preventDefault();
    var item = stock[this.parentNode.parentNode.getAttribute('data-name')];
    cart.remove(item);
    $('#item-count').html(cart.contents.length);
    $('#price').html(currencyFormat(cart.balance()));
  });

  $('#checkout').on('click', function(){
    var shopping = []
    for(i=0; i<cart.contents.length;i++){shopping.push(cart.contents[i])};
    shopping.forEach(function(product) {
      $('ul').append('<li>' + product.name + " Price: £" + product.price)
    });
    $('.total-price').html(cart.balance())
  });

  $('.voucher').on('click', function(event){
    event.preventDefault();
    try {cart.add(eval(this.getAttribute("data-name")));
    }
    catch(err) {
      alert(err);
    }
    $('.total-price').text(cart.balance())
  });

  $('.close').on('click', function() {
    $('ul').empty();
  })

});