var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function(id, client) {
    this.clients[id] = client;
    this.subcriptions[id] = function(senderId, message) {
        if (id != senderId) {
            this.clients[id].write(message);
            //this.clients[id].write(id);
        }
    }
    this.on('broadcast', this.subscriptions[id]);
});

var server = net.createServer(function(client) {
    var id = client.remoteAddress + ":" + client.remotePort;
    client.on('connect', function() { // Joining the channel
        console.log("emitting join");
        channel.emit('join', id, client);
    });
    client.on('data', function(data) { // Writing to someone else
        console.log("emitting broadcast");
        data = data.toString();
        channel.emit('broadcast', id, data);
    });
});

server.listen(8888);
