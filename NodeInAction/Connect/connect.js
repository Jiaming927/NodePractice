var connect = require('connect');
var app = connect();
app.use(logger); // the order here is the order of middlewares
app.use(hello);
app.listen(8888);

function logger(req, res, next) { // next means next middleware
    console.log('%s %s', req.method, req.url);
    next();
}

function hello(req, res) { // No next needed because it responds here
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
}
