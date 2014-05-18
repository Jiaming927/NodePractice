var http = require('http');
var ult = require('url');
var items = [];

var server = http.createServer(function(req, res) {
    switch(req.method) {
        case 'POST':
            var item = '';
            req.setEncoding('utf8');
            req.on('data', function(chunk) {
                item += chunk;
            });
            req.on('end', function(chunk) {
                items.push(item);
                res.end('OK\n');
            });
    }
});
