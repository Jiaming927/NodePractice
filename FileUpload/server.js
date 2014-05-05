// The server, takes parameter, pass it to router


// All commented codes are previous versions, kept for reference
// Tried to write all the reasons for my codes so that I can remember what happened

var http = require("http");
var url = require("url");

function start(route, handle) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " receivced");
		
		// Set encoding to be UTF-8, don't need this line anymore, fomidable handle this for us
		//request.setEncoding("utf8"); 
		
		// POST data comes with chunks, we get chunks of data, until we get end

		// Don't need this anymore, too
		// We don't want to consume the date here
		// Add a listener to listen to data event
		/*request.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Received Post data-chunk'" + postDataChunk + "'.");
		}); */

		// Listen to end event
		//request.addListener("end", function() {
		route(handle, pathname, response, request);
		//});

		// Deleting all these following codes, we want the router and handler to write
		// We only pass the response object, and let other components do things about that
		// response.writeHead(200, {"Content-type": "text/plain"});
		// var content = route(handle, pathname);
		// response.write(content);
		// response.end();
	}

	http.createServer(onRequest).listen(8000);
	console.log("Server has started");
}

exports.start = start;
