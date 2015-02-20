var mysql = require('mysql');

var config = {
	host : 'localhost',
	port : '3306',
	user : 'root',
	database : 'yedadong'
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