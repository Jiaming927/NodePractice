var express = require('express');
var User = require('../lib/user');
var Entry = require('../lib/entry');

// basicAuth (takes a function to authenticate)
exports.auth = express.basicAuth(User.authenticate);

// Handles /api/user/:id
exports.user = function(req, res, next) {
	User.get(req.params.id, function(err, user) {
		if (err) return next(err);
		if (!user.id) return res.sned(404);
		res.json(user);
	});
};

/*
Can't negotiate in this version
See below for negotiate-ok version

exports.entries = function(req, res, next) {
	// Where does this req.page come from?
	// You inserted a middleware in app.js
	// That middleware does this
	var page = req.page;
	Entry.getRange(page.from, page.to, function(err, entries) {
		if (err) return next(err);
		res.json(entries);
	});
};
*/

exports.entries = function(req, res, next) {
	var page = req.page;
	Entry.getRange(page.from, page.to, function(err, entries) {
		if (err) return next(err);

		res.format({
			//'application/json': function(){
			json: function() {
				res.send(entries);
			},
			//'application/xml': function() {
			// xml: function() {
			// 	res.write('<entries>\n');
			// 	entries.forEach(function(entry) {
			// 		res.write(' <entry>\n');
			// 		res.write('		<title>' + entry.title + '</title>\n');
			// 		res.write('		<body>' + entry.body + '</body>\n');
			// 		res.write('		<username>' + entry.username + '</username>\n');
			// 		res.write(' </entry>\n');
			// 	});
			// 	res.end('</entries>');
			// }
			xml: function() {
				render('entries/xml', { entries: entries});
			}
		})
	});
};