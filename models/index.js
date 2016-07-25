'use strict';

const electron = require('electron').remote;
const os = require('os');
const path = require('path');
const fs = require('fs-extra');

const webview = document.getElementById("webview");

// ページ読み込み開始時
webview.addEventListener('did-start-loading', ()=> {
    webview.setAudioMuted(true);
});

// ページ読み込み終了時
webview.addEventListener('did-finish-load', ()=> {
    insertCss();
});

// ゲーム以外の余分な部分を非表示にする
function insertCss(){
    fs.readFile(path.dirname(__dirname) + '/public/css/clip.css','utf8', (err, data) => {
        webview.insertCSS(data);
        if(err) console.error(err);
    });
}