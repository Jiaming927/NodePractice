var connect = require('connect');

var app = connect()
            .use(connect.logger('dev'))
            .use(function(req, res, next) {
                setTimeout(function () {
                    next(new Error('something broke'));
                }, 500);
            })
            .use(connect.errorHandler()); // Default nice handler, can respond with different type of files

app.listen(8888);
