'use strict'

const { BrowserWindow } = require('electron');

const defaultProperties = {
    width: 500,
    height: 800,
    show: false,
    webPreferences: {
        nodeIntegration: true
    }
};

class Window extends BrowserWindow {

    constructor({ file, ...windowSettings }) {
        super({ ...defaultProperties, ...windowSettings });

        // load HTML, open devtools
        this.loadFile(file);
        // this.webContents.openDevTools();

        // Show when ready to prevent flickering
        this.once('ready-to-show', () => {
            this.show();
        });
    }
}

module.exports = Window;