// SIGINT (Unix event sent by shell wheneven ctrl-c is pressed)
process.on('SIGINT', function() {
	console.log('Got Ctrl-C!');
	server.close();
});