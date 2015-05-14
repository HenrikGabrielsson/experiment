var ws = require("websocket").server;
var nodeStatic = require("node-static");
var http = require("http");

var fileServer = new nodeStatic.Server("./public", {cache: 0});

var httpServer =  http.createServer(function (request, response) 
{
	//capture timestamp when first request reaches server.
	if(request.url === "/http.html" || request.url === "/ws.html")
	{
		console.log(Date.now());
	}

	request.addListener("end", function () 
    {
    	fileServer.serve(request, response);
    }).resume();	

}).listen(8080);



var wsServer = new ws({httpServer: httpServer});
wsServer.on("request", function(request) {

    var connection = request.accept("gallerytest", request.origin);

    console.log("mu");
});