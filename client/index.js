const electron = require('electron')
const { app, BrowserWindow } = electron
const axios = require('axios')
const posturl = require('./notanIP') //remote URL for Ben's Server
var FormData = require('form-data');

// Browser Window
let win = null

// List of messages that have already been displayed
var usedMessageIDs = [];

app.on('ready', () => {

  //function runs on an interval to check server for a new message  
  function checkServerForNewMessages() {
    
    //formdata to pass id to new_messages route
    var messageFormData = new FormData();
    messageFormData.append('messageid', usedMessageIDs[0]);

    //axios http request for new_messages route on server
    axios({
      method: 'post',
      url: 'http://localhost:8081/new_messages',
      data: messageFormData,
      config: { headers: { 'Content-Type': 'multipart/form-data' }}
    })
      //on success, start new browser window and send data to render process
      .then(res => {
        var messageData = res.data;
        console.log(messageData);
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
          win.webContents.send('message:sendData', messageData)
        })
        usedMessageIDs.push(messageData.id);
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