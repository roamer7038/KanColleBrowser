'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

electron.crashReporter.start();

let mainWindow = null;
app.on('window-all-closed', function() {
    app.quit();
});

app.commandLine.appendSwitch('ppapi-flash-path', __dirname + '/plugins/PepperFlashPlayer.plugin');
app.commandLine.appendSwitch('ppapi-flash-version', '20.0.0.255');

app.on('ready', function() {
    mainWindow = new BrowserWindow( {
        width: 800, height: 502,
        frame: true,
        transparent: false,
        resizable: false,
        'web-preferences': {
            'plugins': true
        }
    });
    mainWindow.loadUrl('file://'+__dirname+'/index.html');
    mainWindow.on('closed', function() {
        mainWindow = null;
        app.quit();
    });
});