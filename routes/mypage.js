var DBpool = require('../lib/DBpool');

exports.index = function(req, res) {
	if (req.session.user_id) {
		res.render('mypage');
	} else {
		res.redirect('./');
	}
};

exports.getGroupList = function(req, res){
	var id = req.session.user_id;
	
	DBpool.acquire(function(err, client) {
		client.query('select group_name as groups, group_desc as descript  from member_group natural join group_list where id=? and member_group_state=\'1\' and group_state=\'1\'', [id], function(err, rows) {
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

exports.getWaitingList = function(req, res){
	var id = req.session.user_id;
	
	DBpool.acquire(function(err, client) {
		client.query('select group_name as groups, group_desc as descript  from member_group natural join group_list where id=? and member_group_state=\'2\' and group_state=\'1\'', [id], function(err, rows) {
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

exports.createGroup = function(req, res){
	var id = req.session.user_id;
	var groupID = req.body.groupID;
    var groupDesc = req.body.groupDesc;

    var checkGroupQuery = "select count(*) as groups from group_list WHERE group_name=?";
	var addGroupQuery = "INSERT INTO group_list(group_name, group_desc, group_state) VALUES (?,?,?)";
	var addMemberGroupQuery = "INSERT INTO member_group(id, group_name, member_group_state,group_admin) VALUES (?,?,?,?)";
	
	DBpool.acquire(function(err, client) {
		client.query(checkGroupQuery, [groupID], function(err, rows) {
			if ( rows[0].groups != 0 ) {
				DBpool.release(client);
	        	res.send({ "status": "FAIL"});
	    	}
	       else {
		        client.query(addGroupQuery,[groupID, groupDesc, "1"],function(error, rows, fields){
		            client.query(addMemberGroupQuery,[id, groupID, "1", "1"],function(error, rows, fields){
		            	DBpool.release(client);
		            	res.send({ "status": "SUCCESS" });
		        	});
		        });
	    	}
		});
	});
};

exports.changeState = function(req, res){
	var id = req.session.user_id;
	var groupID = req.body.groupID;

	var deleteGroupList = "update member_group set member_group_state = '0' where id = ? and group_name = ?";

	DBpool.acquire(function(err, client) {
		client.query(deleteGroupList, [id,groupID], function(err, rows) {
			if (err) {
				DBpool.release(client);
				console.log(err);
			} else {
				DBpool.release(client);
				res.send({ "status": "SUCCESS" });
			}
		});
	});
};

exports.moveGroup = function(req, res){
	var id = req.session.user_id;
	var groupID = req.body.groupID;
	req.session.user_group = groupID;

	res.render('groupHome');
};

exports.searchGroup = function(req, res){
	
	DBpool.acquire(function(err, client) {
		client.query('select group_name as groups, group_desc as descript from group_list where group_name like "%' + req.body.searchValue + '%"', function(err,rows) {
			if(err) {
				DBpool.release(client);
				console.log(err);
			} else {
				console.log(rows);
				res.send(rows);
				DBpool.release(client);
			}
		});
	});
};