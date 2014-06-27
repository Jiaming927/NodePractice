var net = require('net');

var socket = net.connect({host: process.argv[2], port: 22});
socket.setEncoding('utf-8');

socket.once('data', function(chunk) {
	console.log('SSH server version: %j', chunk.trim());
	socket.end();
});

/*
Sending data from reader to writer

	socket.pipe(socket);
*/