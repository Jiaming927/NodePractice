// Some notes:
// Basically every time you add something, there are several essential components
// 1, some templates in views
// 2, change app.js to route to some function
// 3, an (object?, like a router) that contains the functions
// Route: the js file that handles returning stuffs
// Lib: objects and middleware
// Views: templates

var express = require('express');
var session = require('express-session'); // Install this seperately
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var register = require('./routes/register');
var login = require('./routes/login');
var entries = require('./routes/entries');
var api = require('./routes/api');

var routes = require('./routes/index');
var entries = require('./routes/entries'); // Show all entries
var users = require('./routes/users');
var user = require('./lib/middleware/user');
var register = require('./routes/register');
var messages = require('./lib/messages');
var validate = require('./lib/middleware/validate');
var page = require('./lib/middleware/page'); // Pager middleware
var Entry = require('./lib/entry');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('THERE IS NO SECRET'));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.session()); This line no longer works, express changed, see above to know how to fix this
app.use(session()); // This one works, see session variable above
app.use('/api', api.auth);
app.use(user);
app.use(messages);
//app.use(app.router); Deprecated in Express 4.0
app.use(routes.notfound); // Better handling of not found
app.use(routes.error); // Better error handling

//app.use('/', routes);
//app.get('/', page(Entry.count, 5), entries.list); See below to allow optional parameter
app.use('/users', users);
app.get('/register', register.form); // Add routes
app.post('/register', register.submit);
app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);
app.get('/post', entries.form); // Displays a form
// Add middleware validating
app.post('/post', 
        validate.required('entry[title]'),
        validate.lengthAbove('entry[title]', 4),
        entries.submit); // When receive a post request
// More notes about things like /:page
// This is the same as ?page=1 and {"page": 1}
app.get('/:page?', page(Entry.count, 5), entrie.list); // This one here, optional parameter
// API routes
app.get('/api/user/:id', api.user);
app.get('/api/entries/:page?', page(Entry.count),api.entries);
app.post('/api/entry', entries.submit); // Add things to entry


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

app.listen(8888);
