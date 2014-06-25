var net = require('net');

net.createServer(function(socket) {
	socket.write('Hello world');
	socket.end();

	console.log('listening on port 1337')

	// Some examples

	socket.on('data', function(data) {
		console.log('got "data"', data);
	});

	socket.on('end', function() {
		console.log('socket has ended');
	});

	socket.on('close', function() {
		console.log('client disconnected');
	});

}).listen(1337);