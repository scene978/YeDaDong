var mysql = require('mysql');

var config = {
    host: '54.64.150.217' , 
    port: '3306' , 
    user: 'root' ,
    password: 'foxya.!' ,
    database: 'yedadong'
};

var client = mysql.createConnection(config);

exports.index = function(req, res) {
	if (req.session.user_id) {
		console.log(req.session.user_id);
		res.render('groupHome');
	} else {
		res.redirect('./');
	}
};

exports.logout = function(req, res) {
	req.session.destroy(function() {
		console.log("Route: Logout");
	});

	res.write("");
	res.end();
};

exports.helloMessage = function(req, res) {  //다솜이 시키기
	var id = req.session.user_id;
	client.query('select member_name from member where id=?', [id], function(err, rows) {
		if (err) {
			console.log(err);
		} else {
			var name = {
				'name' : rows[0].member_name
			};
			res.send(name);
		}
	});
};

exports.scrollGroupList = function(req, res){
	var id = req.session.user_id;
	
	client.query('select group_name as groups from member_group natural join group_list where id=? and member_group_state=\'1\' and group_state=\'1\'', [id], function(err, rows) {
		if (err) {
			console.log(err);
		} else {
			res.send(rows);
		}
	});
};