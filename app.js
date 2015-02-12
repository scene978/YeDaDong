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
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(logger('dev'));
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

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var config = {
        host: 'localhost' , 
        port: '3306' , 
        user: 'root' ,
        database: 'yedadong'
};
 
var client = mysql.createConnection(config);

client.connect();

client.query('select * from member',function(error, rows, fields){
    if(error) {
        console.log("MySQL Failure");
        console.log(error);
                  } 
    else{
        console.log(rows);
    }
});

app.get('/', function(req,res) {
    console.log("ok");
    if (req.session.user_id) {
        console.log(req.session.user_id);
        res.render('welcome');
    } else {
        res.sendfile('views/index.html');
    }
});

app.post('/login', function(req,res){

     console.log("Hello");
    
    var id = req.body.email;
    var pwd = req.body.password;
    console.log(id);
    console.log(pwd);
    client.query('select count(*) as a from member WHERE id=? and pwd=?',[id,pwd],function(error, rows, fields){
        if(error) {
            console.log("MySQL Failure");
            console.log(error);
            } 
        else{
               if ( rows[0].a == 0 ) {
                    res.send({ "status": "FAIL"});
                } else {
                    req.session.email = id;
                    res.send({ "status": "SUCCESS" });
                    console.log("send");
                }
        }
    });
});