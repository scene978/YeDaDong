var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');

var config = {
        host: 'localhost' , 
        port: '3306' , 
        user: 'root' ,
        database: 'yedadong'
};
 
var client = mysql.createConnection(config);

client.connect();

client.query('select * from login',function(error, rows, fields){
    if(error) {
        console.log("MySQL Failure");
        console.log(error);
                  } 
    else{
        console.log(rows);
    }
});

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(session({secret: 'good'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/views')); // 이걸써야 css와 자바스크립트가 먹더라

var sess;

app.get('/', function(req,res){
    console.log("gggg");
    sess=req.session;

    res.send('hello world');

    // if(sess.email)
    // {   
    //     res.redirect('colorfulflat/2_login_after.html');
    // }
    // else{
    //     res.sendfile('views/index.html');
    // }
});

app.post("/login",function(req,res){
    console.log("1");
    console.log(req.body);
    sess=req.session;
    //In this we are assigning email to sess.email variable.
    //email comes from HTML page.
    sess.email=req.body.email;
    res.end("done");
});

app.get('colorfulflat/2_login_after.html',function(req,res){
    sess=req.session;
    if(sess.email)
    {
        res.sendfile("colorfulflat/2_login_after.html");
        // res.write('<h1>Hello '+sess.email+'</h1>');
        // res.end('<a href="http://127.0.0.1:3000/logout">Logout</a>');
    }
    else
    {
        res.write('<h1>Please login first.</h1>');
        res.end('<a href="http://127.0.0.1:3000/">Login</a>');
    }
});

app.get('/logout',function(req,res){
    req.session.destroy(function(err){
        console.log("good");
    if(err){
        console.log(err);
    }
    else
    {
        res.redirect('/');
    }
    });
});

app.listen(3000,function(){
    console.log("App Started on PORT 3000");
});