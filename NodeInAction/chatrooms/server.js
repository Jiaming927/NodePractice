// File server

var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var cache = {};

var filePath = false;
var server = http.createServer(function(request, response) {
    if (request.url == '/') {
        filePath = 'public/index.html';
    } else {
        filePath = 'public' + request.url;
    }

    var absPath = './' + filePath;
    serveStatic(response, cache, absPath);
});
server.listen(8000, function() {
    console.log('Server listening on port 8000');
});

function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Error 404: resource not found');
    response.end();
}

function sendFile(response, filePath, fileContents) {
    response.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))});
    response.end(fileContents);
}

//
function serveStatic(response, cache, absPath) {
    if (cache[absPath]) { // If the file path is cached
        sendFile(response, absPath, cache[absPath]);
    } else {
        fs.exists(absPath, function(exists) { // If that file exists
            if (exists) { // If so, read the file
                fs.readFile(absPath, function(err, data) { // Read file
                    if (err) {
                        send404(response);
                    } else { // Cache it
                        cache[absPath] = data;
                        sendFile(response, absPath, data);
                    }
                })
            } else { // Not even there, then send 404
                send404(response);
            }
        });
    }
}
