var express = require('express');
var res = express.response; // prototype for response object

// Queue the message
res.message = function(msg, type) { // This can be access by everyone
	// Whenever there is a message, push that onto session
	type = type || 'info';
	var sess = this.req.session;
	sess.messages = sess.messages || [];
	sess.messages.push({type: type, string: msg});
};

res.error = function(msg) {
	return this.message(msg, 'error');
};

module.exports = function(req, res, next) {
	res.locals.messages = req.session.messages || [];
	res.locals.removeMessages = function() {
		req.session.messages = [];
	};
	next();
}