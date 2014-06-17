var User = require('../user');

module.exports = function(req, res, next) {
	if (req.remoteUser) { // To make this work with basicAuth
		res.locals.user = req.remoteUser;
	}
	var uid = req.session.uid;
	if (!uid) return next();
	User.get(uid, function(err, user) {
		if (err) return next(err);
		req.user = res.locals.user = user; // Expose User (this user object is returned from User.get)
		next();
	})
}