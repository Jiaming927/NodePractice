var http = require('http');
var server = http.createServer(function(req, res) {
    res.end('hello http'); // Short response, combined write and end
});

server.listen(8888);
