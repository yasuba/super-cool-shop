var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var data = require('./public/javascript/data.json');

app.use(require('express').static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response){
  var result = [];
  for(var i in data){
    result.push([i, data[i]]);
  }
  response.render('index', {result: result});
});

app.get('/products/:item', function(request, response){
  var params = request.params.item;
  var item = data[params];
  response.render('products', {'item': item});
})

app.post('/checkout', function(request, response){
  var balance = request.body.balance;
  var categories = request.body.itemCategory;
  response.render('checkout', {'balance': balance, 'categories': categories});
});

http.listen(8001, function(){
    console.log('listening on port 8001');
});