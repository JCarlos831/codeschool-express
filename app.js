var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/cities', function(request, response){
    var cities = ['Providence', 'Boston', 'Austin', 'Miami', 'Detroit'];
    response.json(cities);
});

app.listen(process.env.PORT);