var DBpool = require('../lib/DBpool');

exports.index = function(req, res) {
	if (req.session.user_id) {
		res.render('groupBoard');
	} else {
		res.redirect('./');
	}
};
