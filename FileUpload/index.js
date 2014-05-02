// Index page, set up stuffs and call server.start

var server = require("./server");
var router = require("./router");
var requestHandler = require("./requestHandler");

var handle = {} // An object
handle["/"] = requestHandler.start; // Save functions as the value
handle["/start"] = requestHandler.start; 
handle["/upload"] = requestHandler.upload;
handle["/show"] = requestHandler.show;

server.start(router.route, handle); // Starts server, pass router and the handle object