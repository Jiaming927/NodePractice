var connect = require('connect');

var app = connect()
    .use(connect.basicAuth('tj', 'tobi'));
