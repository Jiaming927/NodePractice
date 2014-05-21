var http = require('http');
//var ult = require('url');
var items = [];
var qs = require('querystring');
var formidable = require('formidable');

var server = http.createServer(function(req, res) {
    switch(req.method) {
        case 'GET':
            show(res);
            break;
        case 'POST':
            upload(req, res);
            break;
        default:
            badRequest(res);
    }
});

server.listen(8888);

function show(res) {
    var html =  '<form method="post" action="/" enctype="multipart/form-data">'
                + '<p><input type="text" name="item" /></p>'
                + '<p><input type="file" name="file" /></p>'
                + '<p><input type="submit" value="Add Item" /> </p>'
                + '</form>';
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

function upload(req, res) {
    if (!isFormData(req)) {
        badRequest(res);
        return;
    }

    var form = new formidable.IncomingForm(); // Initialize
    form.parse(req); // Parse the request here
    
}

function isFormData(req) {
    var type = req.headers['content-type'] || '';
    return 0 == type.indexOf('multipart/form-data');
}

function notFound(res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
}

function badRequest(res) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Bad Request');
}
