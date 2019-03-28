const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql');
const dbConfig = require('./databaseConfig.js');

const app = express();

app.use(bodyParser.urlencoded());

const upload = multer({ dest: 'tmp/uploads/' })

const connection = mysql.createConnection({
    host     : dbConfig.host,
    user     : dbConfig.user,
    password : dbConfig.password,
    database : dbConfig.database
});

//Adds a listener that attempts to reconnect when DB connection is dropped.
function handleDisconnect(connection) {
    connection.on('error', function(err) {
      if (!err.fatal) {
        return;
      }
  
      if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
        throw err;
      }
  
      console.log('Re-connecting lost connection: ' + err.stack);
  
      connection = mysql.createConnection(connection.config);
      handleDisconnect(connection);
      connection.connect();
    });
}
  
handleDisconnect(connection);
connection.connect();

app.get('/', upload.none(), function (req, res) {
   res.send('Welcome to the TU-Relay server.');
})

app.post('/new_messages', upload.none(), function (req, res) {
    //Access DB and check for new messages with id higher than provided id.
    //If no provided id, provide all messages.
    let start = "0";
    if (req.body.messageid)
        start = req.body.messageid;

    connection.query("SELECT * FROM message WHERE DELETED = 'F' AND ID > ?", start, function (err, rows, fields) {
        if (err) throw err;
        
        res.status(200).json(rows);
    });
})

app.post('/send_message', upload.single("blob"), function (req, res) {
    //Stores message into the database so clients can access it.
    let message = {
        Title: req.body.Title,
        Content: req.body.Content,
        MessageTypeID: req.body.MessageTypeID,
        UserID: req.body.UserID
    }

    if (req.file) {
        fs.readFile(req.file.path, function (err, data) {
            if (err) throw err;
            message.Image = data;

            connection.query('INSERT INTO message SET ?', message, function (err, rows, fields) {
                if (err) throw err;
            });
            res.status(204).send();
        });
    } else {
        connection.query('INSERT INTO message SET ?', message, function (err, rows, fields) {
            if (err) throw err;
        });
    
        res.status(204).send();
    }
})

app.delete('/delete_messages', upload.none(), function (req, res) {
    //Change specified messages' delete flag to true
    for (let i = 0; i < req.body.messages.length; i++) {
        connection.query("UPDATE message SET Deleted = 'T' WHERE ID = ?", req.body.messages[i], function (err, rows, fields) {
            if (err) throw err;
        });
    }
    res.status(204);

    res.send();
})

app.post('/undelete_messages', upload.none(), function (req, res) {
    //Change specified messages' delete flag to false
    if (req.body.messages) {
        for (let i = 0; i < req.body.messages.length; i++) {
            connection.query("UPDATE message SET Deleted = 'F' WHERE ID = ?", req.body.messages[i], function (err, rows, fields) {
                if (err) throw err;
            });
        }
        res.status(204);
    } else 
        res.status(400);
    
    res.send();
})

app.get('/get_types', upload.none(), function (req, res) {
    //Retrieve all undeleted types from database
    connection.query("SELECT * FROM messagetype WHERE DELETED = 'F'", function (err, rows, fields) {
        if (err) throw err;
        
        res.status(200).json(rows);
    });
})

app.post('/make_type', upload.none(), function (req, res) {
    //Retrieves type info from post and add to DB
    let messagetype = {
        Name: req.body.Name,
        Priority: req.body.Priority,
        Color: req.body.Color
    }

    connection.query('INSERT INTO messagetype SET ?', messagetype, function (err, rows, fields) {
        if (err) throw err;
        console.log(messagetype);
    });

    res.status(204).send();
})

app.post('/edit_type', upload.none(), function (req, res) {
    //TODO: Edit type using provided info
    let messagetype = {
        Name: req.body.Name,
        Priority: req.body.Priority,
        Color: req.body.Color
    }

    connection.query('UPDATE messagetype SET ? WHERE ID = ?', [messagetype, req.body.ID], function (err, rows,fields) {
        if (err) throw err;
    })

    res.status(204).send();
})

app.delete('/delete_types', upload.none(), function (req, res) {
    //Delete the specified types from the database.
    for (let id in req.body.messagetypes) {
        connection.query("UPDATE messagetype SET Deleted = 'T' WHERE ID = ?", id, function (err, rows, fields) {
            if (err) throw err;
        });
    }
    res.status(204);

    res.send();
})

app.get('/get_templates', upload.none(), function (req, res) {
    //Retrieve all undeleted templates from database
    connection.query("SELECT * FROM messagetemplate WHERE DELETED = 'F'", function (err, rows, fields) {
        if (err) throw err;
        
        res.status(200).json(rows);
    });
})

app.post('/make_template', upload.single("blob"), function (req, res) {
    //Retrieves template info from post and add to DB
    let messagetemplate = {
        Name: req.body.Name,
        Title: req.body.Title,
        Content: req.body.Content,
        MessageTypeID: req.body.MessageTypeID,
        UserID: req.body.UserID
    }

    if (req.file) {
        fs.readFile(req.file.path, function (err, data) {
            if (err) throw err;
            messagetemplate.Image = data;

            connection.query('INSERT INTO messagetemplate SET ?', messagetemplate, function (err, rows, fields) {
                if (err) throw err;
            });
            res.status(204).send();
        });
    } else {
        connection.query('INSERT INTO messagetemplate SET ?', messagetemplate, function (err, rows, fields) {
            if (err) throw err;
        });
    
        res.status(204).send();
    }
})

app.post('/edit_template', upload.single("blob"), function (req, res) {
    //Edit template using provided info.
    let messagetemplate = {
        Name: req.body.Name,
        Title: req.body.Title,
        Content: req.body.Content,
        MessageTypeID: req.body.MessageTypeID,
        UserID: req.body.UserID
    }

    if (req.file) {
        fs.readFile(req.file.path, function (err, data) {
            if (err) throw err;
            messagetemplate.Image = data;

            connection.query('UPDATE messagetemplate SET ? WHERE ID = ?', [messagetemplate, req.body.ID], function (err, rows, fields) {
                if (err) throw err;
            });
            res.status(204).send();
        });
    } else {
        connection.query('UPDATE messagetemplate SET ? WHERE ID = ?', [messagetemplate, req.body.ID], function (err, rows, fields) {
            if (err) throw err;
        });
    
        res.status(204).send();
    }
})

app.delete('/delete_templates', upload.none(), function (req, res) {
    //Delete the specified templates from the database
    for (let id in req.body.messagetemplates) {
        connection.query("UPDATE messagetemplate SET Deleted = 'T' WHERE ID = ?", id, function (err, rows, fields) {
            if (err) throw err;
        });
    }
    res.status(204);

    res.send();
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Server listening at http://%s:%s", host, port)
})