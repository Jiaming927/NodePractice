// Tiny web app for me to share files in my own wireless network
var app = require('http').createServer(handler);
var fs = require('fs');
var path = require('path');
var mime = require('mime');

function handler(req, res) {
	var mimetype = mime.lookup('installer_win.exe');
	res.setHeader('Content-disposition', 'installer_win.exe');
  	res.setHeader('Content-type', mimetype);
	var filestream = fs.createReadStream('installer_win.exe');
	filestream.pipe(res);
}

app.listen(8888);