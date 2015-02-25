var DBpool = require('../lib/DBpool');

exports.index = function(req, res) {
	if (req.session.user_id) {
		res.render('groupBoard_writing');
		console.log("w");
	} else {
		res.redirect('./');
	}
};
