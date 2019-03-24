const electron = require('electron')
const { app, BrowserWindow } = electron
const axios = require('axios')
const posturl = require('./notanIP')

let win = null

/*function getMessageFromServer() {
  axios.post(posturl.url)
  .then(res => {
    const messageData = res.data;
    const messageTitle = messageData[0].Title;
    const messageContent = messageData[0].Content;
    console.log(messageTitle);
    console.log(messageContent);
  })
  .catch(err => {
    console.log(err);
  });
}*/

app.on('ready', () => {
  const { x, y } = electron.screen.getPrimaryDisplay().workAreaSize
  win = new BrowserWindow (
    {x: 1200,
     y: 0,
     width: 518,
     height: 228,
     transparent: true,
     frame: false,
    });
    axios.post(posturl.url)
    .then(res => {
      const messageData = res.data;
      const messageTitle = messageData[0].Title;
      const messageContent = messageData[0].Content;
      console.log(messageTitle);
      console.log(messageContent);
      win.webContents.on('did-finish-load', () => {
        win.webContents.send('message:sendTitle', messageTitle)
        win.webContents.send('message:sendContent', messageContent)
      })
    })
    .catch(err => {
      console.log(err);
    });
  
  console.log(win.getBounds());
  //win.loadURL(`file://${__dirname}/notification.html`)
  win.loadURL(`file://${__dirname}/messageRed.html`)
});