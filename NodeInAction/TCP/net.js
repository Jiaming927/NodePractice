var net = require('net');

// Same as http
// But only takes one socket object
net.createServer(function(socket) {
	socket.write('Hello world\n');

	console.log('listening on port 1337')

	// Some examples

	// Raw data (default)
	socket.on('data', function(data) {
		console.log('got "data"', data);
	});

	// Client has closed their end
	socket.on('end', function() {
		console.log('socket has ended');
	});

	// Disconnect
	socket.on('close', function() {
		console.log('client disconnected');
	});

	socket.on('error', function(e) {
		console.log('"error" event', e);
	});
	socket.pipe(socket);
}).listen(1337);