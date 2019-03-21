const electron = require('electron');

const { app, BrowserWindow, dialog } = electron;
const url = require('url');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({width: 800, height: 200});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
}

app.on('ready', createWindow);

