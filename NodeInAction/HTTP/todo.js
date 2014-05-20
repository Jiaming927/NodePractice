var http = require('http');
//var ult = require('url');
var items = [];
var qs = require('querystring');

var server = http.createServer(function(req, res) {
    if ('/' == req.url) {
        switch(req.method) {
            case 'GET':
                show(res);
                break;
            case 'POST':
                add(req, res);
                break;
            default:
                badRequest(res);

            // These codes are for curl, there aren't any html content before
            // Above are the codes for GET and POST
            // case 'POST':
            //     var item = '';
            //     req.setEncoding('utf8');
            //     req.on('data', function(chunk) {
            //         item += chunk;
            //     });
            //     req.on('end', function(chunk) {
            //         items.push(item);
            //         res.end('OK\n');
            //     });
            //     break;
            // case 'GET':
            //     var body = items.map(function(item,i) {
            //         return i + ':' + item;
            //     }).join('n');
            //     res.setHeader('Content-Length', Buffer.byteLength(body));
            //     res.setHeader('Content-Type', 'text/plain; charset="utf-8"');
            //     res.end(body);
            //     // items.forEach(function(item, i) {
            //     //     res.write(i + ':' + item + '\n');
            //     // });
            //     // res.end();
            //     break;
            // case 'DELETE':
            //     var path = url.parse(req.url).pathname;
            //     var i = parseInt(path.slice(1), 10);
            //
            //     if (isNaN(i)) {
            //         res.statusCode = 400;
            //         res.end('BAD REQUEST');
            //     } else if (!items[i]) {
            //         res.statusCode = 404;
            //         res.end('Item not found')
            //     } else {
            //         items.splice(i, 1);
            //         res.end('DONE\n');
            //     }
            //     break;
            // case 'PUT':
            //     var path = url.parse(req.url).pathname;
            //     var i = parseInt(path.slice(1), 10);
            //
            //     if (isNaN(i)) {
            //         res.statusCode = 400;
            //         res.end('BAD REQUEST');
            //     } else if (!items[i]) {
            //         res.statusCode = 404;
            //         res.end('Item not found');
            //     } else {
            //         var item = '';
            //         req.setEncoding('utf8');
            //         req.on('data', function(chunk) {
            //             item += chunk;
            //         });
            //         req.on('end', function(chunk) {
            //             items[i] = item;
            //         });
            //     }
        }
    } else {
        notFound(res);
    }
});

server.listen(8888);

function show(res) {
    var html = '<html><head><title>Todo List</title></head><body>'
                + '<h1>Todo List</h1>'
                + '<ul>'
                + items.map(function(item) {
                    return '<li>' + item + '</li>'
                }).join('')
                + '</ul>'
                + '<form method="post" action="/">'
                + '<p><input type="text" name="item" /></p>'
                + '<p><input type="submit" value="Add Item" /> </p>'
                + '</form></body></html>';
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
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

function add(req, res) {
    var body = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {
        body += chunk
    });
    req.on('end', function() {
        var obj = qs.parse(body);
        items.push(obj.item);
        show(res);
    });
}
