var fs = require('fs');
var remote = require('remote');
var capture = require('./capture');

var webview = document.getElementById("view");

setTimeout(function() {
    var title = webview.getTitle();
    console.log(title);
    webview.setAudioMuted(true);
}, 1500);

webview.addEventListener('did-finish-load', function(){
    insertCss();
});

remote.globalShortcut.register('CmdOrCtrl+M', function(){
    mute();
});

remote.globalShortcut.register('CmdOrCtrl+S', function(){
    capture();
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
    webview.insertCSS('#area-game { position: absolute; left: 0; top: -16px; z-index: 1000;}');
}
