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
    var input = $('#itemCategory');
    input.val( input.val() + ',' + stock[item].category );;
  });

  $('.item .remove').on('click', function(event){
    event.preventDefault();
    var item = stock[this.parentNode.parentNode.getAttribute('data-name')];
    console.log(item)
    cart.remove(item);
    $('#item-count').html(cart.contents.length);
    $('#price').val(currencyFormat(cart.balance()));
  });

  $('.minus').on('click', function(event){
    event.preventDefault();
    var itemName = this.parentNode.getAttribute('id');
    var products = JSON.parse($.cookie('cart'));
    products.forEach(function(product){
      if(product.name.indexOf(itemName) > -1) {
        products.splice(products.indexOf(product), 1);
        var balance = $('.balance').html();
        var update = currencyFormat(balance - product.price);
      }
      $('.balance').text(update);
      $('#' + itemName).hide();
      products.forEach(function(product){
        // doesn't have shoes
        if(product.category.indexOf('footwear') < 0 && $('.balance').html() > 50.00) {
          $('#fifteen').hide();
          $('#tenner').show();
        }
        else if(product.category.indexOf('footwear') > 0 && $('.balance').html() < 75.00) {
          $('#fifteen').hide();
          $('#tenner').show();
        }
      });
      if($('.balance').html() < 50.00) {
        $('#fifteen').hide();
        $('#tenner').hide();
        $('#fiver').show();
      }
      if($('.balance').html() < 10.00) {
        $('#fifteen').hide();
        $('#tenner').hide();
        $('#fiver').hide();
      }
      $('#initialPrice').show();
      $('#totalPrice').hide();
    });
  });

  $('.voucher').on('click', function(event){
    event.preventDefault();
    var fullCart = JSON.parse($.cookie('cart'));
    fullCart.forEach(function(cartItem){
      cart.contents.push(cartItem);
    });
    var voucher = (eval(this.getAttribute("data-name")));
    try {cart.add(voucher);
      console.log(voucher.price)
      console.log($('.balance').html())
      var voucherPrice = voucher.price + '.00';
      var balance = eval($('.balance').html() + voucherPrice);
      $('.total-price').text(currencyFormat(balance));
    }
    catch(err) {
      $('.error').show().delay(3000).queue(function(n) {
        $(this).hide(); n();
      });
      $('.error').html(err);
    }
    $('#initialPrice').hide();
    $('#totalPrice').show();
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

