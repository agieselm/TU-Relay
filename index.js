const electron = require('electron')
const { app, BrowserWindow } = electron
const axios = require('axios')
const posturl = require('./notanIP')

let win

function getMessageFromServer() {
  axios.post(posturl.url)
  .then(res => {
    const messageData = res.data;
    console.log(messageData);
    console.log(messageData[0].Title);
    console.log(messageData[0].Content);
  })
  .catch(err => {
    console.log(err);
  });
}

getMessageFromServer();

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
  console.log(win.getBounds());
  //win.loadURL(`file://${__dirname}/notification.html`)
  win.loadURL(`file://${__dirname}/messageRed.html`)
});