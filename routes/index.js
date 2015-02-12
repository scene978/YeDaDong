var mysql = require('mysql');

var config = {
    host: 'localhost' , 
    port: '3306' , 
    user: 'root' ,
    database: 'yedadong'
};

var client = mysql.createConnection(config);

exports.index = function(req,res) {
    if (req.session.user_id) {
        console.log(req.session.user_id);
        //res.render('login'); 다솜이꺼 만들고 건들자
    } else {
        res.render('index');
    }
};


exports.login = function(req,res){
    var id = req.body.email;
    var pwd = req.body.password;
    console.log("???");

    client.query('select count(*) as a from member WHERE id=? and pwd=?',[id,pwd],function(error, rows, fields){
        if ( rows[0].a == 0 ) {
            res.send({ "status": "FAIL"});
        } else {
            req.session.email = id;
            //res.send({ "status": "SUCCESS"});
            res.render('mypage');
        }
    });
};


exports.signin = function(req,res){
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
};