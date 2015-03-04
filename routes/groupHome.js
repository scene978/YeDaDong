var DBpool = require('../lib/DBpool');

exports.index = function(req, res) {
	if (req.session.user_id) {
		res.render('groupHome');
	} else {
		res.redirect('./');
	}
};

exports.rvdMessage = function(req, res){
	var id = req.session.user_id;
	
	DBpool.acquire(function(err, client) {
		client.query('select send_date as date, message_title as title, sender_id as sender  from message  where receiver_id=?', [id], function(err, rows) {
			if (err) {
				DBpool.release(client);
				console.log(err);
			} else {
				DBpool.release(client);
				res.send(rows);
			}
		});
	});
};

exports.sendMessage = function(req, res){
	var id = req.session.user_id;
	
	DBpool.acquire(function(err, client) {
		client.query('select send_date as date, message_title as title, sender_id as sender  from message  where sender_id=?', [id], function(err, rows) {
			if (err) {
				DBpool.release(client);
				console.log(err);
			} else {
				DBpool.release(client);
				res.send(rows);
			}
		});
	});
};