'use strict';

const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const os = require('os');
const execSync = require('child_process').execSync;
const template = require('./models/menus');
const config = require('./config/config');

/* アプリ終了 */
app.on('window-all-closed', ()=> {
    app.quit();
});

/* Mac内のPepperFlashを探す */
/* 無駄な改行を削除          */
const flash = execSync('mdfind  -onlyin ~/Library/Application\\ Support PepperFlashPlayer.plugin').toString().replace(/\r?\n/g,"");

/* Flashのパス指定 */
app.setPath('pepperFlashSystemPlugin', flash);
app.commandLine.appendSwitch('ppapi-flash-path', app.getPath('pepperFlashSystemPlugin'));

/* メインウィンドウ */
let win = null;
app.on('ready', ()=> {
    win = new BrowserWindow( {
        width: 800, height: 502,
        frame: true,
        transparent: false,
        resizable: false,
        fullscreenable: false,
        'web-preferences': {
            'plugins': true
        }
    });
    win.loadURL('file://'+ __dirname + '/views/index.html');
    win.on('closed', ()=> {
        win = null;
        app.quit();
    });
    /* 起動時のメニュー設定 */
    template[2].submenu[1].checked = config.onAudioMuted;
    template[2].submenu[2].checked = config.alwaysOnTop;
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
});

/* 起動時の初期設定読み込み */
ipcMain.on('onConfig', (event, message)=> {
    event.sender.send('onConfig', config);
});