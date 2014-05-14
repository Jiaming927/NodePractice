var net = require('net');

var server = net.createServer(function(socket) {
    socket.on('data', function(data) {
        socket.write(data);
    });
});

server.listen(8888);

// Use this by doing : telnet 127.0.0.1 8888
