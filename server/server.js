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

var imagePaths = 
[
    "./public/images/logo.jpg",
    "./public/images/full_icon.png",
    "./public/images/grid_icon.png",
    "./public/images/gallery/1.jpg",
    "./public/images/gallery/2.jpg",
    "./public/images/gallery/3.jpg",
    "./public/images/gallery/4.jpg",
    "./public/images/gallery/5.jpg",
    "./public/images/gallery/6.jpg",
    "./public/images/gallery/7.jpg",
    "./public/images/gallery/8.jpg",
    "./public/images/gallery/9.jpg",
    "./public/images/gallery/10.jpg",
    "./public/images/gallery/11.jpg",
    "./public/images/gallery/12.jpg",
    "./public/images/gallery/13.jpg",
    "./public/images/gallery/14.jpg",
    "./public/images/gallery/15.jpg",
    "./public/images/gallery/16.jpg",
    "./public/images/gallery/17.jpg",
    "./public/images/gallery/18.jpg",
    "./public/images/gallery/19.jpg",
    "./public/images/gallery/20.jpg",   
    "./public/images/gallery/21.jpg",
    "./public/images/gallery/22.jpg",
    "./public/images/gallery/23.jpg",
    "./public/images/gallery/24.jpg",
    "./public/images/gallery/25.jpg",
    "./public/images/gallery/26.jpg",
    "./public/images/gallery/27.jpg",
    "./public/images/gallery/28.jpg",
    "./public/images/gallery/29.jpg",
    "./public/images/gallery/30.jpg",
    "./public/images/gallery/31.jpg",
    "./public/images/gallery/32.jpg",
    "./public/images/gallery/33.jpg",
    "./public/images/gallery/34.jpg",
    "./public/images/gallery/35.jpg",
    "./public/images/gallery/36.jpg",
    "./public/images/gallery/37.jpg",
    "./public/images/gallery/38.jpg",
    "./public/images/gallery/39.jpg",
    "./public/images/gallery/40.jpg",   
    "./public/images/gallery/41.jpg",
    "./public/images/gallery/42.jpg",
    "./public/images/gallery/43.jpg",
    "./public/images/gallery/44.jpg",
    "./public/images/gallery/45.jpg",
    "./public/images/gallery/46.jpg",
    "./public/images/gallery/47.jpg",
    "./public/images/gallery/48.jpg",
    "./public/images/gallery/49.jpg",
    "./public/images/gallery/50.jpg",
    "./public/images/gallery/51.jpg",
    "./public/images/gallery/52.jpg",
    "./public/images/gallery/53.jpg",
    "./public/images/gallery/54.jpg",
    "./public/images/gallery/55.jpg",
    "./public/images/gallery/56.jpg",
    "./public/images/gallery/57.jpg",
    "./public/images/gallery/58.jpg",
    "./public/images/gallery/59.jpg",
    "./public/images/gallery/60.jpg",   
]

var wsServer = new ws({httpServer: httpServer});
wsServer.on("request", function(request) {

    var connection = request.accept("gallerytest", request.origin);

    //serve all scripts
    scriptPaths.forEach(function(path)
    {
        connection.sendUTF(jsonBuffer.stringify(
        {
            mimeType: "text/javascript",
            type: "script", 
            data: fs.readFileSync(path)
        }));        
    });

    //serve all stylesheets
    stylePaths.forEach(function(path)
    {
        connection.sendUTF(jsonBuffer.stringify(
        {
            mimeType: "text/css" ,
            type: "style", 
            data: fs.readFileSync(path)
        }));        
    });

    //serve all images
    imagePaths.forEach(function(path)
    {
        var mimeType;

        var tempArr = path.split("."); 
        switch(tempArr[tempArr.length -1])
        {
            case "jpg":
                mimeType = "image/jpeg";
                break;
            case "png":
                mimeType = "image/png";
                break;
            case "gif":
                mimeType = "image/gif";
        }

        connection.sendUTF(jsonBuffer.stringify(
        {
            mimeType: mimeType,
            type: "image", 
            data: fs.readFileSync(path), 
            path: path
        }));        
    });
});