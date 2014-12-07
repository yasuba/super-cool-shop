var app = require('express')();
var http = require('http').Server(app);

var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('./public/javascript/data.json', 'utf8'));

app.use(require('express').static('public'));

app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response){
  response.render('index', obj);
});

http.listen(8001, function(){
    console.log('listening on port 8001');
});