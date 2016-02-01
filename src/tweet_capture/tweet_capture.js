'use strict';

// jQueryをローカルで扱う
window.jQuery = window.$ = require('jquery');


const fs = require('fs');
const os = require('os');
const electron = require('electron');
const remote = electron.remote;
const BrowserWindow = remote.BrowserWindow;
const Twitter = require('twitter');
const OAuth = require('oauth').OAuth;
const reg = /(.[.]jpg|.[.]jpeg|.[.]png|.[.]gif)/;
let PATH = os.homedir() + '/Pictures/鎮守府ぐらし！/';
let img, media;

// PATH先のディレクトリの画像一覧を出力
fs.readdir( PATH , function(err, files){
    if (err) throw err;
    let fileList = [];
    files.forEach(function (file) {
        if( file.match(reg)) {
            fileList.push(file);
        }
    });
    fileList.forEach(function (file) {
        let filePath = PATH + file;
        img = '<span class="img-box"><img src="'
            + filePath + '"><p><span class="filename">'
            + file +'</span></p></span>';
        $('#output').append(img);
    });
});


const token = {
    CONSUMER_KEY : 'dHDozUteB2vO4yJGcT2Sa7SzF',
    CONSUMER_SECRET : 'kzSEsFTGl7YgKBXrwLrMFeYjVozBxZQ4IAVE4cEubPxYKsHukq',
    ACCESS_TOKEN_KEY : null,
    ACCESS_TOKEN_SECRET : null
};

try {
    const account = require('./account');
    token.ACCESS_TOKEN_KEY = account.ACCESS_TOKEN_KEY;
    token.ACCESS_TOKEN_SECRET = account.ACCESS_TOKEN_SECRET;
} catch (error){
    console.log(error);
}

// OAuth認証
if(token.ACCESS_TOKEN_KEY == null){
    const authUrl = 'https://api.twitter.com/oauth/authenticate?oauth_token=';
    const oauth = new OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        token.CONSUMER_KEY,
        token.CONSUMER_SECRET,
        '1.0A',
        null,
        'HMAC-SHA1'
    );

    oauth.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
        let url = authUrl + oauth_token;
        const loginWindow = new BrowserWindow({width: 800, height: 600});
        loginWindow.webContents.on('will-navigate', function(event, url){
            let urlinfo = require('url').parse(url, true);
            if(urlinfo.query.oauth_verifier){
                oauth.getOAuthAccessToken(oauth_token, oauth_token_secret,
                    urlinfo.query.oauth_verifier,
                    function(error, oauth_access_token, oauth_access_token_secret){
                        token.ACCESS_TOKEN_KEY = oauth_access_token;
                        token.ACCESS_TOKEN_SECRET = oauth_access_token_secret;
                        fs.writeFile(__dirname + '/account.json', JSON.stringify(token, null, '   '));
                        loginWindow.close();
                        remote.getCurrentWindow().reload();
                    });
            }
            else {
                loginWindow.close();
            }
            event.preventDefault();
        });
        loginWindow.loadUrl(url);
    });
}

const client = new Twitter({
    consumer_key        : token.CONSUMER_KEY,
    consumer_secret     : token.CONSUMER_SECRET,
    access_token_key    : token.ACCESS_TOKEN_KEY,
    access_token_secret : token.ACCESS_TOKEN_SECRET
});

// 画像をツイートする
function post(){
    let tweet = document.forms.tweetForm.tweetArea.value;
    let data = fs.readFileSync(media);
    client.post('media/upload', {media: data}, function(error, media, response){
        if(!error){
            console.log(media);
        }
        let status = {
            status: tweet,
            media_ids: media.media_id_string
        };
        client.post('statuses/update', status, function(error, tweet, response){
            if(!error) {
                console.log(tweet);
                document.forms.tweetForm.tweetArea.value = '';
            }
        });
    });
}

// クリックした画像のURIを取得
$(document).on('click', "img", function(){
    $('img').removeClass('active');
    $(this).addClass('active');
    media = this.src;
    media = media.substring(7 ,media.length);
    media = decodeURI(media);
});

// ボタンイベント
$('#upload').click(function(){
    post();
});

$('#close').click(function(){
    remote.getCurrentWindow().close();
});


