var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Welcome to the TU-Relay server.');
})

app.get('/new_messages', function (req, res) {
    //TODO: Access DB and check for new messages
    res.send('This route will retrieve new messages.');
})

app.post('/send_message', function (req, res) {
    //TODO: Parse message from post and add to DB
    res.send('This route will send a message.');
})

app.post('/make_category', function (req, res) {
    //TODO: Parse category info from post and add to DB
    res.send('This route will make a category.');
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Server listening at http://%s:%s", host, port)
})