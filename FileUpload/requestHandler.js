// These two functions will be called by router.js

//var exec = require("child_process").exec;
var querystring = require("querystring"); // This helps us to parse the post data
var fs = require("fs") // File system
var formidable = require("formidable");

function start(response, request) { // The real handling function
	console.log("Request handler 'start' was called");

	var body = '<html><head><meta charset="utf-8" content="text/html" http-equiv="Content-Type"></head><body><form action="/upload" enctype="multipart/form-data" method="POST"><input type="file" name="upload" /><input type="submit" value="Upload file" /></form></body></html>';
	
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function upload(response, request) {	// The serious handling function
	console.log("Request handler 'upload' was called");
	var form = new formidable.IncomingForm();
	console.log("About to parseeee");
	form.parse(request, function (error, fields, files) {
		console.log("parsing done!");
		fs.rename(files.upload.path, "tmp/test.png", function(err) {
			if (err) {
				fs.unlink("tmp/test.png");
				fs.rename(files.upload.path, "tmp/test.png");
			}
		});
	});
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("received: <br/>"); // Transform the post data here
	response.write("<img src='/show' />");
	response.end();
}

function show(response, request) {
	console.log("Request handler 'show' was called.");
	// Use formidable module
	fs.readFile("tmp/test.png", "binary", function(error, file) {
		if (error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;