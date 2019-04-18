const electron = require('electron')
const { app, BrowserWindow } = electron
const axios = require('axios')

// Remote URL for Ben's Server. IP in gitignore
const posturl = require('./notanIP')

// Browser Window
let win;

// ID of the last displayed message. Updated after each successful request
var usedMessageID = 0;

// bool to determine if the id of the newest message in the database has been set
var initialIDSet = false;

// Boolean value set to true if there is new message content returned form the axios request
var hasNewMessage = false;

// Event 'ready' emitted when electron has finished initializing.
app.on('ready', () => {

  //runs function on app start
  setInitialMessageID();
  
  //Function calls server and obtains ID of last message in database. It then runs checkServerForNewMessages()
  function setInitialMessageID() {

    //ID object to send to new_messages route. Initial call will always start at 0
    var initialid = { messageid: usedMessageID }

    // Axios post request for new_messages route on server. Call returns list JSON objects with all messages in server
    axios({
      method: 'post',
      url:  'http://localhost:8081/new_messages',
      data: JSON.stringify(initialid),
      headers: { 'Content-Type': 'application/json' }
    })
    
    // Successful call sets usedMessageID to the ID of the last message on the server and sets interval to poll server with other function
    .then(res => {
      var listOfAllMessages = res.data;
      var lastMessageInList = listOfAllMessages.pop();

      usedMessageID = lastMessageInList.ID

      initialIDSet = true;

      if(initialIDSet = true) {
        setInterval(checkServerForNewMessages, 5000);
      } 
    })

    // Failed server call re-runs this function
    .catch(err => {
      console.log("Could not execute initial axios call");
      console.log(err);
      setInitialMessageID();
    })
}
   
  // Function to make server call.
  // If successful, creates a new instance of browser window and sends data to render process via electron web contents.
  // Throws errors on http request failure
  function checkServerForNewMessages() {
  
    // js object that passes messageid into axios request as a JSON object
    var obj = { messageid: usedMessageID };
        
    // Axios post request for new_messages route on server. Call returns list JSON objects with id's greater than the messageid given
    axios({
      method: 'post',
      url:  'http://localhost:8081/new_messages',
      data: JSON.stringify(obj),
      headers: { 'Content-Type': 'application/json' }
    })

    // If http request is successful, create new instance of browser window and send message data to render process
      .then(res => {

    // MessageData is a list of JSON objects returned by the server
        var messageData = res.data;

    // Sets hasNewMessage to true if there is message data
        if(messageData[0].ID != null) { hasNewMessage = true; }

    // New instance of electron browser window
        win = new BrowserWindow(
          {
            x: 1200,
            y: 0,
            width: 518,
            height: 228,
            transparent: true,
            frame: false,
            resizable: false,
          });

    // If there is a new message, load message URL and pass web contents to render process
        if(hasNewMessage = false) {
           win = null
        } else {

    // Loads browser window with contents of specified URL
        win.loadURL(`file://${__dirname}/relayMessage.html`);

    // Callback to send message data to browser window via electron webContents
        win.webContents.on('did-finish-load', () => {
          win.webContents.send('message:sendData', messageData[0])
        })

    // Update ID of last displayed message
        usedMessageID = messageData[0].ID;
        hasNewMessage = false;
        }
      })

    // If http request fails, log errors
      .catch(err => {
        console.log("No new Messages");
      });
  }
});
// Fired when all windows have been closed in electron app
// This event declaration prevents the electron app from closing if all browser windows close
// Polling process continues to run in the background process
app.on('window-all-closed', () => {

});
