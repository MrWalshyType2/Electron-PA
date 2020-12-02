'use strict'

const { app, ipcMain } = require('electron');
const path = require('path');

const Window = require('./Window');

let mainWindow;

function main() {
    mainWindow = new Window({
        file: 'index.html'
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    })
}

app.whenReady().then(main);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Creates a window only if the app is running and has no visible windows
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        main();
    }
});