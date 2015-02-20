var express = require('express');
var routes = require('./routes/index');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var ejs = require('ejs');
var mysql = require('mysql');

var routes = require('./routes');
var mypage = require('./routes/mypage');
var groupHome = require('./routes/groupHome');

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

// var users = require('./routes/users');
// app.use('/', routes);
// app.use('/users', users);

app.listen(3000,function(){
    console.log("App Started on PORT 3000");
});

var config = {
    host: 'localhost' , 
    port: '3306' , 
    user: 'root' ,
    database: 'yedadong'
};

var client = mysql.createConnection(config);
client.connect();

//index
app.get('/', routes.index);
app.post('/login', routes.login);
app.post('/signin', routes.signin);

//mypage
app.get('/mypage', mypage.index);
app.get('/mypage/logout', mypage.logout);
app.get('/mypage/helloMessage', mypage.helloMessage);
app.post('/mypage/scrollGroupList', mypage.scrollGroupList);
app.post('/mypage/getGroupList', mypage.getGroupList);
app.post('/mypage/getWaitingList', mypage.getWaitingList);
app.post('/mypage/createGroup', mypage.createGroup);
app.post('/mypage/changeState', mypage.changeState);
app.post('/mypage/moveGroup', mypage.moveGroup);

//groupHome
app.get('/groupHome', groupHome.index);