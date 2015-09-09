var app = require('app');
var BrowserWindow = require('browser-window');
var globalShortcut = require('global-shortcut');

require('crash-reporter').start();

var mainWindow = null;
app.on('window-all-closesd', function() {
    app.quit();
});
app.commandLine.appendSwitch('ppapi-flash-path', __dirname + '/plugin/PepperFlashPlayer.plugin');
app.commandLine.appendSwitch('ppapi-flash-version', '18.0.0.232');
app.on('ready', function() {
    mainWindow = new BrowserWindow( {
        width: 800, height: 502,
        frame: true,
        show: true,
        transparent: false,
        resizable: false,
        center: true,
        'web-preferences': {
            'plugins': true
        }
    });
    mainWindow.loadUrl('file://'+__dirname+'/index.html');
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});

app.on('will-quit', function(){
    globalShortcut.unregisterAll();
    app.quit();
});