var app = require('express')();
var http = require('http').Server(app);

var data = require('./public/javascript/data.json');

app.use(require('express').static('public'));

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response){
  var result = [];
for(var i in data){
    result.push([i, data[i]]);}

  response.render('index', {result: result});
});

http.listen(8001, function(){
    console.log('listening on port 8001');
});