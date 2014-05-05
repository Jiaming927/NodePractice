// Route things around

function route(handle, pathname, response, request) {
	console.log("About to route a request for " + pathname);
	if (typeof handle[pathname] === 'function') { // If that's a function
		console.log("Routing you to " + pathname); // For debug issues
		handle[pathname](response, request); // Go to that function!
	} else {
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"}); // Write directly
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route; // Put this out to let everyone use it
