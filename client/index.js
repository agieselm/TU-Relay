const electron = require('electron')
const { app, BrowserWindow } = electron
const axios = require('axios')
const posturl = require('./notanIP') //remote URL for Ben's Server
var FormData = require('form-data');

// Browser Window
let win = null

// List of messages that have already been displayed
var usedMessageIDs = [3];

app.on('ready', () => {

  //function runs on an interval to check server for a new message  
  function checkServerForNewMessages() {
    
    console.log(usedMessageIDs);

    //formdata to pass id to new_messages route
    var messageFormData = new FormData();
    messageFormData.append('messageid', usedMessageIDs[0].toString());

    var obj = { messageid: usedMessageIDs[0].toString() };
        
    //axios http request for new_messages route on server
    axios({
      method: 'post',
      url: 'http://localhost:8081/new_messages',
      data: JSON.stringify(obj),
      headers: { 'Content-Type': 'application/json' }
    })
      //on success, start new browser window and send data to render process
      .then(res => {

        var messageData = res.data;
        console.log(messageData);
        console.log(messageData[0].ID);
        console.log(messageData[0].Title);
        console.log(messageData[0].Content);
        //TODO: need to make the browser window size and position responsive
        win = new BrowserWindow(
          {
            x: 1200,
            y: 0,
            width: 518,
            height: 228,
            transparent: true,
            frame: false,
          });
        //loads browser window at specified URL
        win.loadURL(`file://${__dirname}/messageRed.html`);

        //callback to send message data to browser window
        //TODO: send correct object to html page
        win.webContents.on('did-finish-load', () => {
          win.webContents.send('message:sendData', messageData[0])
        })
        usedMessageIDs.shift();
        usedMessageIDs.push(messageData[0].ID);
        console.log(usedMessageIDs);
      })
      //on failure, log errors
      .catch(err => {
        console.log(err);
      });
  }
  //runs above function on a set interval (ms)
  setInterval(checkServerForNewMessages, 10000);
});


app.on('window-all-closed', () => {

});

//sample sql message
//insert into message (Title, Content, MessageTypeID, UserID) values ("This is the test title, yay", "This is the test content, viola", 1, 12);