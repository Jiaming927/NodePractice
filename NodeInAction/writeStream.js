var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-type': 'image/png'});
    fs.createReadStream('./image.png').pipe(res);
}).listen(8000);

console.log('Server running at http://localhost:8000/');
