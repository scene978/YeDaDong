var DBpool = require('../lib/DBpool');

exports.index = function(req,res) {
    if (req.session.user_id) {
        res.render('mypage');
    } else {
        res.render('index');
    }
};


exports.login = function(req,res){
    var id = req.body.email;
    var pwd = req.body.password;

    DBpool.acquire(function(err, client) {
        client.query('select count(*) as a from member WHERE id=? and pwd=?',[id,pwd],function(error, rows, fields){
            if ( rows[0].a == 0 ) {
                DBpool.release(client);
                res.send({ "status": "FAIL"});
            } else {
                req.session.user_id = id;
                DBpool.release(client);
                res.render('mypage');
            }
        });
    });
};


exports.signin = function(req,res){
    var id = req.body.email;
    var pwd = req.body.password;
    var name = req.body.userName;

    DBpool.acquire(function(err, client) {
        client.query('select count(*) as a from member WHERE id=?',[id],function(error, rows, fields){
            DBpool.release(client);
            if ( rows[0].a != 0 ) {
               res.send({ "status": "FAIL"});
           }
           else {
                client.query('INSERT INTO member(id, pwd, member_name) VALUES (?,?,?)',[id, pwd, name],function(error, rows, fields){
                    DBpool.release(client);
                    res.send({ "status": "SUCCESS" });
                });
            }
        });
    });
};