var connect = require('connect');

var app = connect()
            .use(connect.directory(process.cwd()))
            .use(connect.static(process.cwd()));

app.listen(8888);
