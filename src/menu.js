var remote = require('remote');
var Menu = remote.require('menu');
var capture = require('./capture');
var application = require('./package.json');
document.title = application.name;

var template = [
    {
        label: application.name,
        submenu: [
            {
                label: application.name + ' について',
                click: function() {
                    alert(
                        application.name + '\n' +
                        'バージョン  ' + application.version );
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
            }
        ]
    }
];

menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

