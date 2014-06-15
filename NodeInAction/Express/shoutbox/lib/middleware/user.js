var User = require('../user');

module.exports = function(req, res, next) {
	var uid = req.session.uid;
	if (!uid) return next();
	User.get(uid, function(err, user) {
		if (err) return next(err);
		req.user = res.locals.user = user; // Expose User (this user object is returned from User.get)
		next();
	})
}