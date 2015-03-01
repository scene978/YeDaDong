var DBpool = require('../lib/DBpool');

exports.index = function(req, res) {
	if (req.session.user_id) {
		res.render('groupSetting_board');
	} else {
		res.redirect('./');
	}
};

exports.getBoardList = function(req, res){
	var groupID = req.session.user_group;
	
	var getBoardList = 'select board_name as board from boards natural join group_list where group_name=? and board_status!=\'0\'';

	DBpool.acquire(function(err, client) {
		client.query(getBoardList, [groupID], function(err, rows) {
			if (err) {
				DBpool.release(client);
				console.log(err);
			} else {
				res.send(rows);
				DBpool.release(client);
			}
		});
	});
};