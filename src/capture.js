'use strict';

const mkdirp = require('mkdirp');
const nativeImage = electron.nativeImage;
const PATH = os.homedir() + '/Pictures/'+ appName +'/';

module.exports = function(){
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
    const now = new Date(),
        year = now.getFullYear().toString(),
        month = (now.getMonth()+1).toString(),
        date = now.getDate().toString(),
        hour = now.getHours().toString(),
        min = now.getMinutes().toString(),
        sec = now.getSeconds().toString();
    return (year + '-' + month + '-' + date + '-' + hour + min + sec);
}
