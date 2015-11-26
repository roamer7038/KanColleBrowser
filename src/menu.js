console.log('loading menu.js');

//const electron = require('electron');
//const remote = electron.remote;
const Menu = remote.Menu;
//const capture = require('./capture');
const application = require('./package.json');

var appName = '鎮守府ぐらし！';
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

