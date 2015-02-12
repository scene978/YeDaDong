var express = require('express');
var routes = require('./routes/index');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mysql = require('mysql');

var app = express();

var server = http.createServer(app);

// view engine setup
app.engine('.html', require('ejs').__express);

app.set('views', __dirname + '/views');
app.engine('.html', require('ejs').renderFile);
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
app.get('/mypage', function(req,res) {
    console.log("test");
    res.render('mypage');
});