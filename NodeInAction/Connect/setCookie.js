var connect = require('connect');

var app = connect()
    .use(function(req, res) {
        res.setHeader('Set-cookie', 'foo=bar');
        res.setHeader('Set-cookie', 'tobi=ferret;Expires=Tue, 08 Jun 2014 10:18:14 GMT');
        res.end();
    }).listen(8888);
