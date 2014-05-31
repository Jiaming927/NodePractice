var connect = require('connect');

var users = {
    tobi: 'foo',
    loki: 'bar',
    jane: 'baz'
};

var app = connect()
    //.use(connect.basicAuth('tj', 'tobi')); // Only one username and one password
    // .use(connect.basicAuth(function(user, pass) { // Using a function to auth
    //     return users[user] === pass;
    // }));
    .use(connect.basicAuth(function(user, pass, callback) {
        User.authenticate({ user:user, pass:pass }, gotUser); // Asynchronous call back auth
        function gotUser(err, user) {
            if (err) return callback(err);
            callback(null, user);
        }
    }))

app.listen(8888);
