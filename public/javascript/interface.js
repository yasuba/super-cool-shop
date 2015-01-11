var cart = new ShoppingCart();
var itemCount = 0;
var fiver = new Voucher('voucher', 'fiver', -5.00);
var tenner = new Voucher('voucher', 'tenner', -10.00);
var fifteen = new Voucher('voucher', 'fifteen', -15.00);

function currencyFormat (num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1")
}

$.get('/javascript/data.json', function(data){
  var stock = data;

  $('.item .add').on('click', function(event){
    event.preventDefault();
    item = this.parentNode.parentNode.getAttribute('data-name');
    try {
      cart.add(stock[item]);
    }
    catch(err) {
      $('.error').show().delay(3000).queue(function(n) {
        $(this).hide(); n();
      });
      $('.error').html(err);
    }
    $('#item-count').html(cart.contents.length);
    $('#price').val(currencyFormat(cart.balance()));
    var input = $('#itemName');
    input.val( input.val() + ',' + stock[item].name );;
  });

  $('.item .remove').on('click', function(event){
    event.preventDefault();
    var item = stock[this.parentNode.parentNode.getAttribute('data-name')];
    cart.remove(item);
    $('#item-count').html(cart.contents.length);
    $('#price').val(currencyFormat(cart.balance()));
    var input = $('#itemName');
    input.val(input.val().replace(item.name, 'removed'));
  });

  $('.voucher').on('click', function(event){
    var fullCart = JSON.parse($.cookie('cart'));
    fullCart.forEach(function(cartItem){
      cart.contents.push(cartItem);
    });
    event.preventDefault();
    try {cart.add(eval(this.getAttribute("data-name")));
    }
    catch(err) {
      $('.error').show().delay(3000).queue(function(n) {
        $(this).hide(); n();
      });
      $('.error').html(err);
    }
    $('.total-price').text(cart.balance())
  });

  $('.close').on('click', function() {
    $('ul').empty();
  })

  $('#checkoutButton').on('click', function(event){
    var contents = JSON.stringify(cart.contents);
    var date = new Date();
    date.setTime(date.getTime() + (30 * 1000));
    $.cookie('cart', contents, {expires: date});
  });

});

