var connect = require('connect');
var app = connect()
    .use(connect.bodyParser())
    .use(function(req, res) {
        res.end('Registered new user: ' + req.body.username + "\n");
    }).listen(8888)
