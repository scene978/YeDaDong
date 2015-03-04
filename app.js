var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var ejs = require('ejs');
var mysql = require('mysql');

var routes = require('./routes/index');
var mypage = require('./routes/mypage');
var groupHome = require('./routes/groupHome');
//var groupFamily = require('./routes/groupFamily');
var groupBoard = require('./routes/groupBoard');
var groupSettingMember = require('./routes/groupSetting_member');
var groupSettingBoard = require('./routes/groupSetting_board');
var groupBoard_writing = require('./routes/groupBoard_writing');
var movepage = require('./routes/movepage');
var header = require('./routes/header');

var app = express();

var server = http.createServer(app);

// view engine setup
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(session({secret: 'good'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000,function(){
    console.log("App Started on PORT 3000");
});


//index
app.get('/', routes.index);
app.post('/login', routes.login);
app.post('/signin', routes.signin);


//mypage
app.get('/mypage', mypage.index);
app.post('/mypage/getGroupList', mypage.getGroupList);
app.post('/mypage/getWaitingList', mypage.getWaitingList);
app.post('/mypage/createGroup', mypage.createGroup);
app.post('/mypage/changeState', mypage.changeState);
app.post('/mypage/moveGroup', mypage.moveGroup);
app.post('/mypage/searchGroup', mypage.searchGroup);


//groupHome
app.get('/groupHome', groupHome.index);
/*
app.get('groupHome/getProfile', groupHome.getProfile);
app.post('groupHome/rvdMessage', groupHome.rvdMessage);
app.post('groupHome/sendMessage', groupHome.sendMessage);
app.post('/groupHome/imageUpload', groupHome.imageUpload);
app.post('/groupHome/sendMessage', groupHome.sendMessage);
*/


//groupBoard
app.get('/groupBoard', groupBoard.index);


//groupBoard_writing
app.get('/groupBoard_writing', groupBoard_writing.index);
//app.post('/groupBoard_writing/writeBoard', groupBoard_writing.writeBoard);
//app.post('/groupBoard_writing/loadList', groupBoard_writing.loadList);


//groupFamily


//groupSettingMember
app.get('/groupSettingMember', groupSettingMember.index);


//groupSettingBoard
app.get('/groupSettingBoard', groupSettingBoard.index);
app.get('/groupSettingBoard/getBoardList', groupSettingBoard.getBoardList);
//app.post('/groupSettingBoard/getGroupList', groupSettingBoard.getGroupList);

//movepage
app.get('/moveHome', movepage.moveHome);
app.get('/moveBoard', movepage.moveBoard);
//app.get('/moveFamily', movepage.moveFamily);
app.get('/moveSettingMember', movepage.moveSettingMember);
app.get('/moveSettingBoard', movepage.moveSettingBoard);
app.get('/moveBoard_writing', movepage.moveBoard_writing);


//header
app.get('/logout', header.logout);
app.get('/helloMessage', header.helloMessage);
app.get('/scrollGroupList', header.scrollGroupList);
app.get('/moveMypage', header.moveMypage);
