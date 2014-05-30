var connect = require('connect');
var fs = require('fs')
var log = fs.createWriteStream('myapp.log', { flags : 'a'}) // Log it to a file

var app = connect()
    .use(connect.logger() // Default configuration don't need any params
    // 'dev there adds a color scheme'
    .use(hello)
    .listen(8888);

function hello(req, res) { // No next needed because it responds here
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
}
