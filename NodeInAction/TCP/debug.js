var debug;
if (process.env.DEBUG) {
	debug = function (data) {
		console.error(data);
	};
} else {
	debug = function() {};
}

debug('this is a debug call');

console.log('Hellp World!');

debug('this another debug call');
