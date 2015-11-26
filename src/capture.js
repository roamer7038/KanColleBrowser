console.log('Loading capture.js');

//const fs = require('fs');
const os = require('os');
const mkdirp = require('mkdirp');
//const electron = require('electron');
//const remote = electron.remote;
const nativeImage = electron.nativeImage;

var appName = '鎮守府ぐらし！';
var path = os.homedir() + '/Pictures/'+ appName +'/';

module.exports = function(){
    var image = nativeImage.createEmpty();
    var stamp = timestamp();
    var rect = {
        x: 0,
        y: 0,
        width: 800,
        height: 480
    };
    remote.getCurrentWindow().capturePage(rect, function(image){
        mkdirp(path, function(err){
            if(err){ console.log(err);}
            fs.writeFile(path+ stamp + '.png', image.toPng());
        });
    });
};

function timestamp(){
    var now = new Date(),
        year = now.getFullYear().toString(),
        month = (now.getMonth()+1).toString(),
        date = now.getDate().toString(),
        hour = now.getHours().toString(),
        min = now.getMinutes().toString(),
        sec = now.getSeconds().toString();
    return (year + '-' + month + '-' + date + '-' + hour + min + sec);
}
