var express = require('express');
var app = express();
var currentDate = new Date();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var cities = {
    'Providence': 'Rhode Island',
    'Boston': 'Massachusetts',
    'Austin': 'Texas',
    'Miami': 'Florida',
    'Detroit': 'Michigan'
};

app.delete('/cities/:name', function(request, response) {
   delete cities[request.cityName];
   response.send(200).json('OK');
});

app.post('/cities', parseUrlencoded, function(request, response) {
    console.log(request.body.city);
    console.log(request.body.state);
    if(request.body.city.length > 4 && request.body.state.length > 2){
    var newCity = request.body;
    cities[newCity.city] = newCity.state;
    
    response.status(201).json(newCity.city);
    } else {
    response.status(404).json("Invalid Entry");
    }
});

app.use(express.static('public'));

app.param('name', function(request, response, next) {
    var name = request.params.name;
    var city = name[0].toUpperCase() + name.slice(1).toLowerCase();
    
    request.cityName = city;
    
    next();

});

app.get('/cities/:name', function(request, response) {
    var state = cities[request.cityName];
    if(!state) {
    response.status(404).json('No state found for ' + request.params.name);   
    } else {
    response.json(state);
    }
});

app.get('/cities', function(request, response){
    if (request.query.limit > Object.keys(cities).length) {
    response.status(404).json('Error');
    } else if (request.query.limit > 0) {
    response.json(Object.keys(cities).slice(0, request.query.limit));
    } else {
    response.json(Object.keys(cities));
    }
});

app.get('/name', function(request, response) {
    response.send("Juan Montoya");
});

app.get('/redirect', function(request, response){
  response.redirect(301, '/surprise');
});

app.get('/surprise', function(request, response){
   response.send("SURPRISE!!!");
});

app.get('/date', function(request, response){
    response.send(currentDate);
});

app.listen(process.env.PORT);