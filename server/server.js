var ws = require("websocket").server;
var nodeStatic = require("node-static");
var http = require("http");
var fs = require("fs");
var jsonBuffer = require("json-buffer");

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

//paths to all files
var scriptPaths = 
[
    "./public/scripts/jquery-2.1.4.min.js",
    "./public/styling/bootstrap/js/bootstrap.min.js",
    "./public/styling/foundation-5.5.2/js/vendor/jquery.js",
    "./public/styling/foundation-5.5.2/js/vendor/modernizr.js",
    "./public/scripts/galleryScript.js"
];
var stylePaths = 
[
    "./public/styling/bootstrap/css/bootstrap.min.css",
    "./public/styling/bootstrap/css/bootstrap-theme.min.css",
    "./public/styling/foundation-5.5.2/css/foundation.min.css",
    "./public/styling/foundation-5.5.2/css/normalize.css",
    "./public/styling/galleryStyle.mobile.css",
    "./public/styling/galleryStyle.css"
]

var wsServer = new ws({httpServer: httpServer});
wsServer.on("request", function(request) {

    var connection = request.accept("gallerytest", request.origin);

    scriptPaths.forEach(function(path)
    {
        connection.sendUTF(jsonBuffer.stringify({type: "script", data: fs.readFileSync(path)}));        
    });

    stylePaths.forEach(function(path)
    {
        connection.sendUTF(jsonBuffer.stringify({type: "style", data: fs.readFileSync(path)}));        
    });
});