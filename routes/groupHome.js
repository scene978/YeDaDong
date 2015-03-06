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


exports.saveProfile = function(req, res){

	var id = req.session.user_id;
	var name = req.body.member_name;
	var age = req.body.age;
	var place = req.body.place;
	var email = req.body.email;
	var contact = req.body.contact;
	var job = req.body.job;

	console.log(contact);
	
	var saveProfileQuery="update member set member_name=?, age=?, location=?, email=?, contact=?, job=? where id=?";

	DBpool.acquire(function(err, client) {
		client.query(saveProfileQuery, [name,age,place,email,contact,job,id], function(err, rows) {
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


exports.getProfile = function(req, res){

	var id = req.session.user_id;
	
	var getProfileQuery="select * from member where id=?";

	DBpool.acquire(function(err, client) {
		client.query(getProfileQuery, [id], function(err, rows) {
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