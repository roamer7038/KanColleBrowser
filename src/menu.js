'use strict';

const Menu = remote.Menu;
const application = require('./package.json');
document.title = appName;

var template = [
    {
        label: appName,
        submenu: [
            {
                label: appName + ' について',
                click: function() {
                    alert(
                        appName + '\n' +
                        'バージョン  ' + application.version + '\n\n' +
                        'Copyright (c) 2015 @roamer7038 ');
                }
            },
            {
                label: '終了',
                accelerator: 'CmdOrCtrl+Q',
                click: function() { remote.getCurrentWindow().close(); }
            }
        ]
    },
    {
        label: '表示',
        submenu: [
            {
                label: 'ページを再読み込み',
                accelerator: 'CmdOrCtrl+R',
                click: function() { remote.getCurrentWindow().reload(); }
            },
            {
                label: '開発ツール',
                accelerator: 'Alt+CmdOrCtrl+I',
                click: function() { remote.getCurrentWindow().toggleDevTools(); }
            }
        ]
    },
    {
        label: 'ウィンドウ',
        submenu: [
            {
                label: '音声ミュート',
                accelerator: 'CmdOrCtrl+M',
                click: function() { mute(); }
            },
            {
                label: 'スクリーンショット',
                accelerator: 'CmdOrCtrl+S',
                click: function() { capture(); }
            },
            {
                label: '画像をツイート',
                accelerator: 'CmdOrCtrl+T',
                click: function() { tweetCapture(); }
            }
        ]
    },
    {
        label: 'ヘルプ',
        role: 'help',
        submenu: [
            {
                label: appName + ' ヘルプ',
                click: function () {
                    electron.shell.openExternal('https://github.com/roamer7038/KanColleBrowser')
                }
            }
        ]
    }

];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

