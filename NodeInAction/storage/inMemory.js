var http = require('http');
var counter = 0;

var server = http.createServer(function(req,res) {
    counter++;
    res.end('I have been accessed ' + counter + ' times');
}).listen(8888);
