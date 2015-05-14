var websocketServer = require('websocket').server;
var nodeStatic = require('node-static');

var server = new nodeStatic.Server('./public', {cache: 0});

require('http').createServer(function (request, response) 
{
	//capture timestamp when first request reaches server.
	if(request.url === "/http.html" || request.url === "/ws.html")
	{
		console.log(Date.now());
	}

	request.addListener('end', function () 
    {
    	server.serve(request, response);
    }).resume();	
	


}).listen(8080);

