var express = require('express');
var app = express();

app.get('/', function(request, response){
    response.send('Hello World');
});

app.get('/blocks', function(request, response){
    // var blocks = ['Fixed', 'Movable', 'Rotating'];
    // response.json(blocks);
    response.redirect(301, '/parts');
});

app.listen(process.env.PORT, function(){
    console.log('Listening on port ' + process.env.PORT+'');
});