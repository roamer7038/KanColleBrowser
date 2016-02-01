'use strict';

const Menu = remote.Menu;

var template = [
    {
        label: application.name,
        submenu: [
            {
                label: application.name + ' について',
                role: 'about'
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
                click: function() {
                    webview.reload();
                }
            },
            /*{
                label: '開発ツール',
                accelerator: 'Alt+CmdOrCtrl+I',
                click: function() { remote.getCurrentWindow().toggleDevTools(); }
            },*/
            {
                label: 'ウィンドウを閉じる',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            }
        ]
    },
    {
        label: '機能',
        submenu: [
            {
                label: '音声ミュート',
                accelerator: 'CmdOrCtrl+M',
                click: function() { volumeMute(); }
            },
            {
                label: 'スクリーンショット',
                accelerator: 'CmdOrCtrl+S',
                click: function() {
                    capture(PATH);
                    if (TweetWindow) { TweetWindow.reload(); }
                }
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
                label: application.name + ' ヘルプ',
                click: function () {
                    electron.shell.openExternal('https://github.com/roamer7038/KanColleBrowser')
                }
            }
        ]
    }

];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

