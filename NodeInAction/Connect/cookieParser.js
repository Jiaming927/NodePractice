var connect = require('connect');
var app = connect()
    .use(connect.cookieParser('tobi is a cool ferret'))
    .use(function(req, res){
        console.log(req.cookies); // Two different objects
        console.log(req.signedCookies);
        res.end('hello\n');
    }).listen(8888);
