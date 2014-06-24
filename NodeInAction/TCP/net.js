var net = require('net');

net.createServer(function(socket) {
	socket.write('Hello world');
	socket.end();
}).listen(1337);

console.log('listening on port 1337')

// Some examples

socket.on('data', function(data) {
	console.log('got "data"', data);
});

socket.on('end', function() {
	console.log('socket has ended');
});