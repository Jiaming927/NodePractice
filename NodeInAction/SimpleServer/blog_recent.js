var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) { // Level #1 callback, request received
    if (req.ult == '/') {
        fs.readFile('./titles.json', function(err, date) { // Level #2, JSON file
            if (err) {
                console.error(err);
                res.end('Server Error');
            } else {
                var titles = JSON.parse(data.toString());

                fs.readFile('./template.html', function(err, data) { // Level #3, html file
                    if (err) {
                        console.err(err);
                        res.end('Server Error');
                    } else {
                        var tmp1 = data.toString();
                        var html = tmp1.replace('%', titles.join('</li><li>'));
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(html);
                    }
                });
            }
        });
    }
}).listen(8888, "127.0.0.1");
