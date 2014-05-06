// Index page, set up stuffs and call server.start

var server = require("./server");
var router = require("./router");
var requestHandler = require("./requestHandler");

var handle = {} // An object that holds functions
handle["/"] = requestHandler.start; // Save functions as values
handle["/start"] = requestHandler.start; 
handle["/upload"] = requestHandler.upload;
handle["/show"] = requestHandler.show;

server.start(router.route, handle); // Starts server, pass router and the handle object
