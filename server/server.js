const express = require('express');
const mysql = require('mysql');
const dbConfig = require('./databaseConfig.js');

const app = express();

var connection = mysql.createConnection({
  host     : dbConfig.host,
  user     : dbConfig.user,
  password : dbConfig.password,
  database : dbConfig.database
});

//Connection test, left temporarily for reference's sake.
connection.connect(function (err) {
    if (err) throw err;
});

connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err;
  
    console.log('The solution is: ', rows[0].solution);
  })

connection.end(function (err) {
    if (err) throw err;
});

app.get('/', function (req, res) {
   res.send('Welcome to the TU-Relay server.');
})

app.get('/new_messages', function (req, res) {
    //TODO: Access DB and check for new messages with id higher than provided id.
    //      If no provided id, provide all messages.
    res.send('This route will retrieve new messages.');
})

app.post('/send_message', function (req, res) {
    //TODO: Parse message from post and add to DB
    res.send('This route will send a message.');
})

app.delete('/delete_message', function (req, res) {
    //TODO: Change specified message's delete flag to true
    res.send('This route will delete a message.');
})

app.post('/make_type', function (req, res) {
    //TODO: Parse type info from post and add to DB
    res.send('This route will make a type.');
})

app.delete('/delete_type', function (req, res) {
    //TODO: Delete the specified type from the database.
    res.send('This route will delete a type.');
})

app.post('/make_template', function (req, res) {
    //TODO: Parse template info from post and add to DB
    res.send('This route will make a message template.');
})

app.delete('/delete_template', function (req, res) {
    //TODO: Delete the specified template from the database
    res.send('This route will delete a message template.');
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Server listening at http://%s:%s", host, port)
})