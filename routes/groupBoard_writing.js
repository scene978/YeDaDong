var DBpool = require('../lib/DBpool');

exports.index = function(req, res) {
	if (req.session.user_id) {
		res.render('groupBoard_writing');
		console.log("w");
	} else {
		res.redirect('./');
	}
};

// exports.writeBoard = function(req,res){
//     var today = req.body.today;
//     var boardTitle = req.body.boardTitle;
//     var boardContent = req.body.boardContent;

//     var writing = "insert into writing (writing_board_name, writing_board_key, writing_writer, writing_title, writing_desc, writing_time, writing_status, writing_views) values ();";

//     DBpool.acquire(function(err, client) {
//         client.query('select count(*) as a from member WHERE id=?',[id],function(error, rows, fields){
//             DBpool.release(client);
//             if ( rows[0].a != 0 ) {
//                res.send({ "status": "FAIL"});
//            }
//            else {
//                 client.query('INSERT INTO member(id, pwd, member_name) VALUES (?,?,?)',[id, pwd, name],function(error, rows, fields){
//                 	DBpool.release(client);
//                     res.send({ "status": "SUCCESS" });
//                 });
//             }
//         });
//     };


exports.loadList = function(req,res){
	res.render('groupBoard');
};