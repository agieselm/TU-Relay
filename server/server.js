const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mysql = require('mysql');
const dbConfig = require('./databaseConfig.js');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const upload = multer({ dest: "tmp/uploads/" });

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
  
      console.log('Re-connecting lost database connection: ' + err.stack);
  
      connection = mysql.createConnection(connection.config);
      handleDisconnect(connection);
      connection.connect();
    });
}
  
handleDisconnect(connection);
connection.connect();

app.get('/', upload.none(), function(req, res, next) {
   res.send('Welcome to the TU-Relay server.');
})

app.post('/new_messages', upload.none(), function(req, res, next) {
    //Access DB and check for new messages with id higher than provided id.
    //If no provided id, provide all messages.
    let start = "0";
    if (req.body.messageid) {
        start = req.body.messageid;
    }

    connection.query("SELECT * FROM message WHERE DELETED = 'F' AND ID > ?", start, function (err, rows, fields) {
        if (err) next(err);
        
        res.status(200).json(rows);
    });
})

app.post('/deleted_messages', upload.none(), function(req, res, next) {
    //Access DB and return all messages.
    connection.query("SELECT * FROM message WHERE Deleted = 'T'", function (err, rows, fields) {
        if (err) next(err);
        
        res.status(200).json(rows);
    });
})

app.post('/send_message', upload.single("blob"), function(req, res, next) {
    //Stores message into the database so clients can access it.
    let message = {
        Title: req.body.Title,
        Content: req.body.Content,
        MessageTypeID: req.body.MessageTypeID,
        UserID: req.body.UserID
    }

    if (req.file) {
        const path = dbConfig.projectDir + req.file.path.replace(/\\/g, "/");
        connection.query('INSERT INTO message SET `Image` = LOAD_FILE("'+path+'"), ?', message, function (err, rows, fields) {
            fs.unlink(req.file.path, function (err) {
                if (err) next(err);
            }) 
            if (err) next(err);
        });
           
        res.status(204).send();
        
    } else {
        connection.query('INSERT INTO message SET ?', message, function (err, rows, fields) {
            if (err) next(err);
        });
    
        res.status(204).send();
    }
})

app.post('/delete_messages', upload.none(), function(req, res, next) {
    //Change specified messages' delete flag to true
    for (let i = 0; i < req.body.messages.length; i++) {
        console.log(req.body.messages[i]);
        connection.query("UPDATE message SET Deleted = 'T' WHERE ID = ?", req.body.messages[i], function (err, rows, fields) {
            if (err) next(err);
        });
    }
    res.status(204);

    res.send();
})

app.post('/undelete_messages', upload.none(), function(req, res, next) {
    //Change specified messages' delete flag to false
    if (req.body.messages) {
        for (let i = 0; i < req.body.messages.length; i++) {
            connection.query("UPDATE message SET Deleted = 'F' WHERE ID = ?", req.body.messages[i], function (err, rows, fields) {
                if (err) next(err);
            });
        }
        res.status(204);
    } else 
        res.status(400);
    
    res.send();
})

app.get('/get_types', upload.none(), function(req, res, next) {
    //Retrieve all undeleted types from database
    connection.query("SELECT * FROM messagetype WHERE DELETED = 'F'", function (err, rows, fields) {
        if (err) next(err);
        
        res.status(200).json(rows);
    });
})

app.post('/make_type', upload.none(), function(req, res, next) {
    //Retrieves type info from post and add to DB
    let messagetype = {
        Name: req.body.Name,
        Priority: req.body.Priority,
        Color: req.body.Color
    }

    connection.query('INSERT INTO messagetype SET ?', messagetype, function (err, rows, fields) {
        if (err) next(err);
        console.log(messagetype);
    });

    res.status(204).send();
})

app.post('/edit_type', upload.none(), function(req, res, next) {
    //TODO: Edit type using provided info
    let messagetype = {
        Name: req.body.Name,
        Priority: req.body.Priority,
        Color: req.body.Color
    }

    connection.query('UPDATE messagetype SET ? WHERE ID = ?', [messagetype, req.body.ID], function (err, rows,fields) {
        if (err) next(err);
    })

    res.status(204).send();
})

app.post('/delete_types', upload.none(), function(req, res, next) {
    //Delete the specified types from the database.
    for (let id in req.body.messagetypes) {
        connection.query("UPDATE messagetype SET Deleted = 'T' WHERE ID = ?", id, function (err, rows, fields) {
            if (err) next(err);
        });
    }
    res.status(204);

    res.send();
})

app.get('/get_templates', upload.none(), function(req, res, next) {
    //Retrieve all undeleted templates from database
    connection.query("SELECT * FROM messagetemplate WHERE DELETED = 'F'", function (err, rows, fields) {
        if (err) next(err);
        
        res.status(200).json(rows);
    });
})

app.post('/make_template', upload.single("blob"), function(req, res, next) {
    //Retrieves template info from post and add to DB
    let messagetemplate = {
        Name: req.body.Name,
        Title: req.body.Title,
        Content: req.body.Content,
        MessageTypeID: req.body.MessageTypeID,
        UserID: req.body.UserID
    }

    if (req.file) {
        const path = dbConfig.projectDir + req.file.path.replace(/\\/g, "/");
        connection.query('INSERT INTO messagetemplate SET `Image` = LOAD_FILE("'+path+'"), ?', messagetemplate, function (err, rows, fields) {
            fs.unlink(req.file.path, function (err) {
                if (err) next(err);
            }) 
            if (err) next(err);
        });
           
        res.status(204).send();
        
    } else {
        connection.query('INSERT INTO messagetemplate SET ?', messagetemplate, function (err, rows, fields) {
            if (err) next(err);
        });
    
        res.status(204).send();
    }
})

app.post('/edit_template', upload.single("blob"), function(req, res, next) {
    //Edit template using provided info.
    let messagetemplate = {
        Name: req.body.Name,
        Title: req.body.Title,
        Content: req.body.Content,
        MessageTypeID: req.body.MessageTypeID,
        UserID: req.body.UserID
    }

    if (req.file) {
        const path = dbConfig.projectDir + req.file.path.replace(/\\/g, "/");
        connection.query('UPDATE messagetemplate SET `Image` = LOAD_FILE("'+path+'"), ? WHERE ID = ?', [messagetemplate, req.body.ID], function (err, rows, fields) {
            fs.unlink(req.file.path, function (err) {
                if (err) next(err);
            }) 
            if (err) next(err);
        });
           
        res.status(204).send();
    } else {
        connection.query('UPDATE messagetemplate SET ? WHERE ID = ?', [messagetemplate, req.body.ID], function (err, rows, fields) {
            if (err) next(err);
        });
    
        res.status(204).send();
    }
})

app.post('/delete_templates', upload.none(), function(req, res, next) {
    //Delete the specified templates from the database
    for (let id in req.body.messagetemplates) {
        connection.query("UPDATE messagetemplate SET Deleted = 'T' WHERE ID = ?", id, function (err, rows, fields) {
            if (err) next(err);
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