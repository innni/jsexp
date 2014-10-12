var express = require('express');
var app = express();
 
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.render('index.htm')
})

app.listen(process.env.PORT || 5000);