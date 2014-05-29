var connect = require('connect');
var app = connect()
    .use(connect.bodyParser()) // Body parser doesn't care what's the content-type, request will tell it
    .use(function(req, res) {
        res.end('Registered new user: ' + req.body.username + "\n");
    }).listen(8888)
