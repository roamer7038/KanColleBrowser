'use strict';

const fs = require('fs');
const electron = require('electron');
const os = require('os');
const remote = electron.remote;
const app = remote.app;
const globalShortcut = remote.globalShortcut;
const BrowserWindow = remote.BrowserWindow;
const application = require('./package');

let config;
try {
    config = require('./config/config.json');
}
catch(errot) {
    config = {
        startVolume :false,
        imagePath   :false,
        resetTwitter:false
    };
}

application.name = "鎮守府ぐらし！";
document.title = application.name;
let PATH = os.homedir() + '/Pictures/'+ application.name +'/'; //スクショ保存場所

const capture = require('./capture');
const webview = document.getElementById("webview");

webview.addEventListener('did-start-loading', function() {
    webview.setAudioMuted(config.startVolume);
});

webview.addEventListener('did-finish-load', function() {
    insertCss();
    shortcut();
});

// ウィンドウアクティブ・ノンアクティブ時のグローバルショートカット切り替え
remote.getCurrentWindow().on('focus', function() {
    shortcut();
});
remote.getCurrentWindow().on('blur', function(){
    globalShortcut.unregisterAll();
});

function volumeMute() {
    if(webview.isAudioMuted()){
        webview.setAudioMuted(false);
    }
    else{
        webview.setAudioMuted(true);
    }
}

// 余分な部分を非表示にする
function insertCss(){
    fs.readFile('./css/insert.css','utf-8',function(err, data) {
        webview.insertCSS(data);
    });
}


function shortcut(){
    globalShortcut.register('CmdOrCtrl+M', function() {
        volumeMute();
    });
    globalShortcut.register('CmdOrCtrl+S', function() {
        capture(PATH);
        if (TweetWindow) { TweetWindow.reload(); }
    });
    globalShortcut.register('CmdOrCtrl+Q', function() {
        app.quit();
    });
}

let TweetWindow = null;
function tweetCapture() {
    if ( TweetWindow ) {
        TweetWindow.focus();
        return 0;
    }
    TweetWindow = new BrowserWindow ({
        width: 650,
        height: 400
    });
    TweetWindow.loadUrl('file://'+__dirname+'/tweet_capture/tweet_capture.html');
    TweetWindow.on('close', function() {
        TweetWindow = null;
    });
}

let ConfigWindow = null;
function openConfig() {
    if ( ConfigWindow ) {
        ConfigWindow.focus();
        return 0;
    }
    ConfigWindow = new BrowserWindow ({
        width: 320,
        height: 300
    });
    ConfigWindow.loadUrl('file://'+__dirname+'/config/config.html');
    ConfigWindow.on('close', function() {
        ConfigWindow = null;
    });
}