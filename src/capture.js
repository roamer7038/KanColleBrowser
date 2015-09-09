var fs = require('fs');
var os = require('os');
var remote = require('remote');
var NativeImage = require('native-image');
var mkdirp = require('mkdirp');
var application = require('./package.json');
var path = os.homedir() + '/Pictures/'+ application.name +'/';

module.exports = function(){
    var image = NativeImage.createEmpty();
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
