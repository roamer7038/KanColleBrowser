'use strict';

const mkdirp = require('mkdirp');
const nativeImage = electron.nativeImage;

module.exports = function(PATH){
    const image = nativeImage.createEmpty();
    const stamp = timestamp();
    const rect = {
        x: 0,
        y: 0,
        width: 800,
        height: 480
    };
    remote.getCurrentWindow().capturePage(rect, function(image){
        mkdirp(PATH, function(err){
            if(err){ console.log(err);}
            fs.writeFile(PATH+ stamp + '.png', image.toPng());
        });
    });
};

function timestamp(){
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
