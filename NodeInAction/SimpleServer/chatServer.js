var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function(id, client) {
    this.clients[id] = client;
    this.subscriptions[id] = function(senderId, message) {
        if (id != senderId) {
            this.clients[id].write(senderId + ' said: ' + message);
        }
    }
    this.on('broadcast', channel.subscriptions[id]);
});

channel.on('leave', function(id) {
    console.log(id + ' left');
    this.removeListener('broadcase', this.subscriptions[id]);
    channel.emit('broadcast', id, id + ' has left you suckers\n');
});

channel.on('shutdown', function() {
        channel.emit('broadcast', '', 'Someone just nuke this chatroom');
        channel.removeAllListeners('broadcast');
});

var server = net.createServer(function(client) {
    var id = client.remoteAddress + ':' + client.remotePort;
    console.log(id + ' is now connected');
    channel.emit('join', id, client); // This is the code I added

    // The commented codes below this are the codes provided in the book
    // But it's NOT working ('join' is never emitted)
    // I commented it out, and add this emit statement above, then it works
    // Also, the commented codes below do not make sense to me
    // When clients are trying to connect, server already got that, why we need
    // on 'connect' here? Having on 'connect' is like saying "hey I connected
    // already, but now I am going to connect again". wtf?

    // client.on('connect', function() { // Joining the channel
    //      console.log('emitting join');
    //      channel.emit('join', id, client);
    // });

    client.on('data', function(data) { // Writing to someone else
        console.log('emitting broadcast');
        data = data.toString();
        if (data == 'nuke this shit\r\n') {
            channel.emit('shutdown');
        }
        channel.emit('broadcast', id, data);
    });

    client.on('close', function() {
        channel.emit('leave', id);
    });
});

server.listen(8888);
