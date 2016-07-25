'use strict';

const electron = require('electron');
const nativeImage = electron.nativeImage;
const mkdirp = require('mkdirp');
const fs = require('fs-extra');

/* 引数（保存先のパス、ウィンドウ） */ 
module.exports = (PATH, win)=> {
    const image = nativeImage.createEmpty();
    const rect = {
        x: 0,
        y: 0,
        width: 800,
        height: 480
    };
    win.capturePage(rect, (image)=> {
        mkdirp(PATH, (err)=> {
            if(err){ console.log(err);}
            fs.writeFile(PATH + timeStamp() + '.png', image.toPng());
        });
    });
};

/* タイムスタンプ  例: 2016-7-25-185543 */
function timeStamp() {
    const
        now = new Date(),
        year = now.getFullYear(),
        month = ("0" + (now.getMonth()+1)).slice(-2),
        date = ("0" + (now.getDate())).slice(-2),
        hour = ("0" + now.getHours()).slice(-2),
        min = ("0" + now.getMinutes()).slice(-2),
        sec = ("0" + now.getSeconds()).slice(-2);
    return (year + '-' + month + '-' + date + '-' + hour + min + sec);
}