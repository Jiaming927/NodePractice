var Entry = require('../lib/entry');

exports.list = function(req, res, next) {
	var page = req.page;
	Entry.getRange(page.from, page.to, function(err, entries) {
		if (err) return next(err);

		res.render('entries', { // Render stuffs
			title: 'Entries',
			entries: entries,
		});
	});
};

exports.form = function(req, res) {
	res.render('post', {title: 'Post'}); // Renders the post.ejs
};

exports.submit = function(req, res, next) {
	var data = req.body.entry;

	var entry = new Entry({
		"username": res.locals.user.name,
		"title": data.title,
		"body": data.body
	});

	// Use the save function we put in prototype
	entry.save(function(err) {
		if (err) return next(err);
		res.redirect('/');
	});
};