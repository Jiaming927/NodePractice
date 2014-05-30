var connect = require('connect');
function edit(req, res, next) {   
    if ('GET' != req.method) return next();   
    res.setHeader('Content-Type', 'text/html');   
    res.write('<form method="post">');
    // name="_method" here overrides stuff   
    res.write('<input type="hidden" name="_method" value="put" />');
    res.write('<input type="text" name="user[name]" value="Tobi" />');
    res.write('<input type="submit" value="Update" />');
    res.write('</form>');
    res.end();
}

function update(req, res, next) {   
    if ('PUT' != req.method) return next();
    res.end('Updated nafme to ' + req.body.user.name);
}

var app = connect()   
    .use(connect.logger('dev'))   
    .use(connect.bodyParser())   
    .use(connect.methodOverride()) // This knows what happened, it accepts put and make it a verb
    .use(edit)   
    .use(update)   
    .listen(8888);
