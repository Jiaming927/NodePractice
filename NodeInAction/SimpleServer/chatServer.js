var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function(id, client) {
    this.clients[id] = client;
    this.subscriptions[id] = function(senderId, message) {
        console.log('Ready to send messages');
        if (id != senderId) {
            console.log('Sending...');
            this.clients[id].write(message);
        }
    }
    this.on('broadcast', channel.subscriptions[id]);
});

var server = net.createServer(function(client) {
    var id = client.remoteAddress + ':' + client.remotePort;
    console.log(id + ' is now connected');
    channel.emit('join', id, client); // This is the code I added

    // The commented codes below this is the code provided in the book
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
        channel.emit('broadcast', id, data);
    });
});

server.listen(8888);
