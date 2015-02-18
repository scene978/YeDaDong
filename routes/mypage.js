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
		res.render('mypage');
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

exports.getGroupList = function(req, res){
	var id = req.session.user_id;
	
	client.query('select group_name as groups, group_desc as descript  from member_group natural join group_list where id=? and member_group_state=\'1\' and group_state=\'1\'', [id], function(err, rows) {
		if (err) {
			console.log(err);
		} else {
			res.send(rows);
		}
	});
};

exports.getWaitingList = function(req, res){
	var id = req.session.user_id;
	
	client.query('select group_name as groups, group_desc as descript  from member_group natural join group_list where id=? and member_group_state=\'2\' and group_state=\'1\'', [id], function(err, rows) {
		if (err) {
			console.log(err);
		} else {
			res.send(rows);
		}
	});
};

exports.createGroup = function(req, res){
	var id = req.session.user_id;
	var groupID = req.body.groupID;
    var groupDesc = req.body.groupDesc;

    var checkGroupQuery = "select count(*) as groups from group_list WHERE group_name=?";
	var addGroupQuery = "INSERT INTO group_list(group_name, group_desc, group_state) VALUES (?,?,?)";
	var addMemberGroupQuery = "INSERT INTO member_group(id, group_name, member_group_state,group_admin) VALUES (?,?,?,?)";
	
	client.query(checkGroupQuery, [groupID], function(err, rows) {
		if ( rows[0].groups != 0 ) {
           res.send({ "status": "FAIL"});
    	}
       else {
	        client.query(addGroupQuery,[groupID, groupDesc, "1"],function(error, rows, fields){
	            client.query(addMemberGroupQuery,[id, groupID, "1", "1"],function(error, rows, fields){
	            	console.log(id);
	            	console.log(groupID);
	            	res.send({ "status": "SUCCESS" });
	        	});
	        });
    	}
	});
};

exports.deleteGroupList = function(req, res){
	var id = req.session.user_id;

	res.render("test");
};

exports.deleteWaitingList = function(req, res){
	var id = req.session.user_id;
	
	client.query('select group_name as groups, group_desc as descript  from member_group natural join group_list where id=? and member_group_state=\'2\' and group_state=\'1\'', [id], function(err, rows) {
		if (err) {
			console.log(err);
		} else {
			res.send(rows);
		}
	});
};