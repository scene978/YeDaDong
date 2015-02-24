var DBpool = require('../lib/DBpool');

exports.logout = function(req, res) {
	req.session.destroy(function() {
		console.log("Route: Logout");
	});
	res.write("");
	res.end();
};

exports.moveMypage = function(req, res) {
	res.render('mypage');
};

exports.helloMessage = function(req, res) { 
	var id = req.session.user_id;

	DBpool.acquire(function(err, client) {
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
	});
};

exports.scrollGroupList = function(req, res){
	var id = req.session.user_id;
	
	DBpool.acquire(function(err, client) {
		client.query('select group_name as groups from member_group natural join group_list where id=? and member_group_state=\'1\' and group_state=\'1\'', [id], function(err, rows) {
			if (err) {
				console.log(err);
			} else {
				res.send(rows);
			}
		});
	});
};