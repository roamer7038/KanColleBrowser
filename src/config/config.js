'use strict';

window.jQuery = window.$ = require('jquery');

const fs = require('fs');
const os = require('os');
const electron = require('electron');
const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;
let config;

try {
    config = require('./config.json');
    if ( config.startVolume ) {
        $("[name=volume]").prop("checked", true);
    }
}
catch (error) {
    config = {
        startVolume :false,
        imagePath   :false,
        resetTwitter:false
    };
}

function save() {
    config.startVolume = $("[name=volume]").prop("checked");
    let json = JSON.stringify(config, null, '   ');
    fs.writeFile(__dirname + '/config.json', json);
    remote.getCurrentWindow().close();
}

// ボタンイベント
$('#apply').click(function() {
    save();
});

$('#cancel').click(function() {
    remote.getCurrentWindow().close();
});
