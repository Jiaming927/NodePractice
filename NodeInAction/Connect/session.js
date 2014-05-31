var connect = require('connect');

var sessionOpts = {
    key: 'myapp_sid',
    cookie: { maxAge: 3600000 * 24}
};

var app = connect()
    .use(connect.favicon())// Will show default favicon, can be customized
    .use(connect.cookieParser('keyboard cat'))
    .use(connect.session(sessionOpts)) // Adds a condition to it, only add session when it's secured
    .use(function(req, res, next) {
        var sess = req.session;
        if (sess.views) {
            res.setHeader('Content-Type', 'text/html');
            res.write('<p>views: ' + sess.views + '</p>');
            res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
            res.write('<p>path: ' + sess.cookie.path + '</p>');
            res.write('<p>domain: ' + sess.cookie.domain + '</p>');
            res.write('<p>secure: ' + sess.cookie.secure + '</p>');
            res.end();
            sess.views++;
        } else {
            sess.views = 1;
            res.end('welcome to the session demo. refresh!');
        }
    });

app.listen(8888);
