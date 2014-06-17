var redis = require('redis');
var db = redis.createClient();

module.exports = Entry;

function Entry(obj) { 
	for (var key in obj) {
		this[key] = obj[key];
	}
}

Entry.prototype.save = function(fn) { // Save entries to database
	var entryJSON = JSON.stringify(this);

	db.lpush(
		'entries',
		entryJSON,
		function(err) {
			if (err) return fn(err);
			fn();
		}
	);
};

Entry.getRange = function(from, to, fn) { // Get a list of entries (with range)
	db.lrange('entries', from, to, function(err, items) { // Gets it from db
		if (err) return fn(err);
		var entries = [];
		items.forEach(function(item) {
			entries.push(JSON.parse(item));
		});

		fn(null, entries);
	});
};

Entry.count = function(fn) {
	db.llen('entries', fn);
};

