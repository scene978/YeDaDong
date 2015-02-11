var express = require('express');
// var routes = require('./routes');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mysql = require('mysql');

var app = express();

var server = http.createServer(app);

// view engine setup
app.set('views', __dirname + '/views');
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(session({secret: 'good'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// var routes = require('./routes/index');
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

app.get('/', function(req,res) {
    if (req.session.user_id) {
        console.log(req.session.user_id);
        //res.render('login'); 다솜이꺼 만들고 건들자
    } else {
        res.render('index');
    }
});

app.post('/login', function(req,res){
    
    var id = req.body.email;
    var pwd = req.body.password;

    client.query('select count(*) as a from member WHERE id=? and pwd=?',[id,pwd],function(error, rows, fields){
        if ( rows[0].a == 0 ) {
            res.send({ "status": "FAIL"});
        } else {
            req.session.email = id;
            //res.send({ "status": "SUCCESS"});
            res.render('test');
        }
    });
});

app.post('/signin', function(req,res){
    
    var id = req.body.email;
    var pwd = req.body.password;
    var name = req.body.userName;

    client.query('select count(*) as a from member WHERE id=?',[id],function(error, rows, fields){
        if ( rows[0].a != 0 ) {
             res.send({ "status": "FAIL"});
        }
        else {
            client.query('INSERT INTO member(id, pwd, member_name) VALUES (?,?,?)',[id, pwd, name],function(error, rows, fields){
                    res.send({ "status": "SUCCESS" });
            });
        }
    });
});

app.get('/test', function(req,res) {
    console.log("test");
    res.render('test');
});