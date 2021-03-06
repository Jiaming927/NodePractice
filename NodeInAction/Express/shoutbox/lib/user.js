var redis = require('redis'); // Uses Redis as database
var bcrypt = require('bcrypt');
var db = redis.createClient(); 

module.exports = User;

// Merges obj's property to its own
function User(obj) {
	for (var key in obj) {
		this[key] = obj[key];
	}
}

// Define all the functions in User object
User.prototype.save = function(fn) {
	if (this.id) {
		this.update(fn);
	} else {
		var user = this;
		db.incr('user:ids', function(err, id) { // Create unique id
			if (err) return fn(err);
			user.id = id;
			user.hashPassword(function(err) { // Hash pw before put in db
				if (err) return fn(err);
				user.update(fn);
			});
		});
	}
};

User.prototype.update = function(fn) {
	var user = this;
	var id = user.id;
	db.set('user:id:' + user.name, id, function(err) {
		if (err) return fn(err);
		db.hmset('user:' + id, user, function(err) { // Uses Redis hash to store data
			fn(err);
		});
	});
};

// Hash pw before save it
User.prototype.hashPassword = function(fn) {
	var user = this;
	bcrypt.genSalt(12, function(err, salt) { // Generates a salt for hashing
		if (err) return fn(err);
		user.salt = salt;
		bcrypt.hash(user.pass, salt, function(err, hash) { // Hash the password
			if (err) return fn(err);
			user.pass = hash;
			fn();
		});
	});
};

// Change the JSON function to protect User's privacy
// toJSON is used by JSON.stringify
User.prototype.toJSON = function() {
	return {
		id: this.id,
		name: this.name
	}
};

User.getByName = function(name, fn) {
	User.getId(name, function(err, id) { // Gets the id back
		if (err) return fn(err);
		User.get(id, fn);
	});
};

User.getId = function(name, fn) {
	db.get('user:id:' + name, fn);
};

User.get = function(id, fn) {
	db.hgetall('user:' + id, function(err, user) {
		if (err) return fn(err);
		fn(null, new User(user));
	});
};

// Authenticate pw and username
// Only compare the hash, so no one can see the pw anywhere
User.authenticate = function(name, pass, fn) {
	User.getByName(name, function(err, user){ // Get that user
		if (err) return fn(err); // If user not found
		if (!user.id) return fn(); // If gets an empty hash back
		bcrypt.hash(pass, user.salt, function(err, hash) { // Get the hash of input
			if (err) return fn(err);
			if (hash == user.pass) return fn(null, user); // Return if it's the same
			fn(); // Invalid password
		});
	});
};