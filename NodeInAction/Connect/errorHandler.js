function errorHandler() { // Error handler has 4 args, Connect is smart enough to tell
    var env = process.env.NODE_ENV || 'development'; // Toggle different mode
    return function(err, req, res, next) {
        res.statusCode = 500;
        switch(env) {
        case 'development':
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(err));
            break;
        default:
            res.end('Server error');
        }
    }
}
