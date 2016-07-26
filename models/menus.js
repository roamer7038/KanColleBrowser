'use strict';

const electron = require('electron');
const Menu = electron.Menu;
const ipcRenderer = electron.ipcRenderer;
const os = require('os');
const capture = require('./capture');

let PATH = os.homedir() + '/Pictures/screenshots/'; /* デフォルトスクリーンショット保存場所 */

const template = [
    {
        label: '表示',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click(item, focusedWindow) {
                    if (focusedWindow) focusedWindow.reload();
                }
            },
            {
                role: 'togglefullscreen'
            },
            {
                label: 'Toggle Developer Tools',
                accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                click(item, focusedWindow) {
                    if (focusedWindow) focusedWindow.webContents.toggleDevTools();
                }
            },
        ]
    },
    {
        label: 'ツール',
        submenu: [
            {
                /* スクリーンショット */
                label: 'Screenshot',
                accelerator: 'CmdOrCtrl+S',
                click(item, focusedWindow) {
                    if (focusedWindow) capture(PATH, focusedWindow);
                }
            },
            {
                /* ミュート */
                label: 'Mute',
                accelerator: 'CmdOrCtrl+M',
                type: 'checkbox',
                click(item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.webContents.send('AudioMuted', 'ping');
                        return item.checked;
                    }
                }
            },
            {
                /* 常に最前面 */
                label: 'AlwaysOnTop',
                accelerator: 'CmdOrCtrl+P',
                type: 'checkbox',
                click(item, focusedWindow) {
                    if (focusedWindow) {
                        if (focusedWindow.isAlwaysOnTop()) focusedWindow.setAlwaysOnTop(false);
                        else focusedWindow.setAlwaysOnTop(true);
                        return item.checked;
                    }
                }
            }
        ]
    },
    {
        label: 'ウィンドウ',
        role: 'window',
        submenu: [
            {
                role: 'minimize'
            },
            {
                role: 'close'
            },
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click() { electron.shell.openExternal('https://github.com/roamer7038/KanColleBrowser'); }
            },
        ]
    },
];

if (process.platform === 'darwin') {
    const name = electron.app.getName();
    template.unshift({
        label: name,
        submenu: [
            {
                role: 'about'
            },
            {
                type: 'separator'
            },
            {
                role: 'services',
                submenu: []
            },
            {
                type: 'separator'
            },
            {
                role: 'hide'
            },
            {
                role: 'hideothers'
            },
            {
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                role: 'quit'
            },
        ]
    });
    /* Window menu. */
    template[3].submenu = [
        {
            label: 'Close',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
        },
        {
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        },
        {
            label: 'Zoom',
            role: 'zoom'
        },
        {
            type: 'separator'
        },
        {
            label: 'Bring All to Front',
            role: 'front'
        }
    ];
}

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

module.exports = template;