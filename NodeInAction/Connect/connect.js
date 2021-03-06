var connect = require('connect');
// var app = connect();
// app.use(logger); // the order here is the order of middlewares
// app.use(hello);
// app.listen(8888);

// Better way
connect()
    .use(logger)
    .use('/admin', restrict)
    .use('/admin', admin)
    .use(hello)
    .listen(8888);

function logger(req, res, next) { // next means next middleware
    console.log('%s %s', req.method, req.url);
    next();
}

function hello(req, res) { // No next needed because it responds here
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
}

// Fun thing about this function, this is not even mentioned in the book..
function authenticateWithDatabase(user, pass, callback) { // hardcoded authorization
  var err;
  if (user != 'tobi' || pass != 'ferret') {
    err = new Error('Unauthorized');
  }
  callback(err);
}

// Restricted access
function restrict(req, res, next) {
    var authorization = req.headers.authorization; // Can only come from authorized area
    if (!authorization) return next(new Error('Unauthorized'));
    // Only error-handling middle will be executed

    var parts = authorization.split(' ')
    var scheme = parts[0]
    var auth = new Buffer(parts[1], 'base64').toString().split(':')
    var user = auth[0]
    var pass = auth[1]

    authenticateWithDatabase(user, pass, function (err) {
        if (err) return next(err);
        next();
    });
}

function admin(req, res, next) {
    switch (req.url) {
        // Uses '/' and '/users' here because Connect strips
        // prefix before invoking middleware
        case '/':
            res.end('try /users');
            break;
        case '/users':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(['tobi', 'loki', 'jiaming']));
            break;
    }
}
