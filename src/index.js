'use strict';

const fs = require('fs');
const electron = require('electron');
const os = require('os');
const remote = electron.remote;
const app = remote.app;
const globalShortcut = remote.globalShortcut;
const BrowserWindow = remote.BrowserWindow;
const appName = '鎮守府ぐらし！';
const capture = require('./capture');
const webview = document.getElementById("view");

setTimeout(function() {
    webview.setAudioMuted(true);
}, 1500);

webview.addEventListener('did-finish-load', function(){
    insertCss();
    shortcut();
});

remote.getCurrentWindow().on('focus', function() {
    shortcut();
});
remote.getCurrentWindow().on('blur', function(){
    globalShortcut.unregisterAll();
});



function mute(){
    if(webview.isAudioMuted()){
        webview.setAudioMuted(false);
    }
    else{
        webview.setAudioMuted(true);
    }
}

function insertCss(){
    webview.insertCSS('body{ overflow:hidden; }');
    webview.insertCSS('#dmm-ntgnavi-renew, #spacing_top, #sectionWrap, .inner, div#ntg-recommend { display: none !important; margin: 0; padding: 0;}');
    webview.insertCSS('html, body, #area-game, #main-ntg, #page, #w, #game_frame { width: 800px; height: 480px; margin: 0 !important; padding: 0 !important;}');
    webview.insertCSS('#area-game { position: absolute; left: 0; top: -36px; z-index: 1000;}');
}

function shortcut(){
    globalShortcut.register('CmdOrCtrl+M', function(){
        mute();
    });
    globalShortcut.register('CmdOrCtrl+S', function(){
        capture();
    });
    globalShortcut.register('CmdOrCtrl+Q', function(){
        app.quit();
    });
}

function tweetCapture(){
    const ssWindow = new BrowserWindow({
        width: 650,
        height: 400
    });
    ssWindow.loadUrl('file://'+__dirname+'/tweet_capture/index.html');
}
