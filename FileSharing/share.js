// Tiny web app for me to share files in my own wireless network
var app = require('http').createServer(handler);
var fs = require('fs');
var path = require('path');
var mime = require('mime');

function handler(req, res) {
	var mimetype = mime.lookup('share.ppt');
	res.setHeader('Content-disposition', 'share.ppt');
  	res.setHeader('Content-type', mimetype);
	var filestream = fs.createReadStream('share.ppt');
	filestream.pipe(res);
}

app.listen(8888);