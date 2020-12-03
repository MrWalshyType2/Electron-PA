'use strict'

const { app, ipcMain } = require('electron');
const path = require('path');
const propertiesReader = require('properties-reader');
const fetch = require('node-fetch');

const Window = require('./Window');

const properties = propertiesReader('./properties.file');
const weatherUrl = properties.get('main.weather.api.url');
const weatherKey = properties.get('main.weather.api.key');
let mainWindow;

function main() {
    mainWindow = new Window({
        file: 'index.html'
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    })

    ipcMain.on('weather-request', () => {
        fetch(weatherUrl + weatherKey, {
            method: 'GET',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            mainWindow.send('weather-data', data);
        })
        .catch(error => {
            console.error(`Error: ${error}`);
        })
    });
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