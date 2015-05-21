var ws = require("websocket").server;
var nodeStatic = require("node-static");
var http = require("http");
var fs = require("fs");
var jsonBuffer = require("json-buffer");


//for serving files
var fileServer = new nodeStatic.Server("./public", {cache: 0});
var httpServer =  http.createServer(function (request, response) 
{
    //capture timestamp when first request reaches server.
    if(request.url.substr(request.url.length - 5) === ".html")
    {
        console.log(Date.now());
    }

    //serve file.
    request.addListener("end", function () 
    {
        fileServer.serve(request, response);
    }).resume();    

}).listen(8080);


//All resources needed for any pages
var favicon = "./public/images/favicon.ico";
var scriptFile = "./public/scripts/script.js";
var styleFile = "./public/styling/style.css";
var fewLargeImagePaths = 
[
    "./public/images/logo.jpg",
    "./public/images/full_icon.png",
    "./public/images/grid_icon.png",
    "./public/images/gallery/large/1.jpg",
    "./public/images/gallery/large/2.jpg",
    "./public/images/gallery/large/3.jpg",
    "./public/images/gallery/large/4.jpg",
    "./public/images/gallery/large/5.jpg",
    "./public/images/gallery/large/6.jpg",
    "./public/images/gallery/large/7.jpg",
    "./public/images/gallery/large/8.jpg",
    "./public/images/gallery/large/9.jpg",
    "./public/images/gallery/large/10.jpg",
    "./public/images/gallery/large/11.jpg",
    "./public/images/gallery/large/12.jpg",
    "./public/images/gallery/large/13.jpg",
    "./public/images/gallery/large/14.jpg",
    "./public/images/gallery/large/15.jpg",
    "./public/images/gallery/large/16.jpg",
    "./public/images/gallery/large/17.jpg",
    "./public/images/gallery/large/18.jpg",
    "./public/images/gallery/large/19.jpg",
    "./public/images/gallery/large/20.jpg",   
    "./public/images/gallery/large/21.jpg",
    "./public/images/gallery/large/22.jpg",
    "./public/images/gallery/large/23.jpg",
    "./public/images/gallery/large/24.jpg",
    "./public/images/gallery/large/25.jpg",
    "./public/images/gallery/large/26.jpg",
    "./public/images/gallery/large/27.jpg",
    "./public/images/gallery/large/28.jpg",
    "./public/images/gallery/large/29.jpg",
    "./public/images/gallery/large/30.jpg"
]



//paths to all files
var scriptPaths = 
[
    "./public/scripts/jquery-2.1.4.min.js",
    "./public/scripts/jquery.js",
    "./public/scripts/bootstrap.min.js",  
    "./public/scripts/modernizr.js",
    "./public/scripts/galleryScript.min.js"
];
var stylePaths = 
[
    "./public/styling/bootstrap.min.css",
    "./public/styling/bootstrap-theme.min.css",
    "./public/styling/foundation.min.css",
    "./public/styling/normalize.css",
    "./public/styling/galleryStyle.css"
]

var manySmallimagePaths = 
[
    "./public/images/logo.jpg",
    "./public/images/full_icon.png",
    "./public/images/grid_icon.png",
    "./public/images/gallery/small/1.jpg",
    "./public/images/gallery/small/2.jpg",
    "./public/images/gallery/small/3.jpg",
    "./public/images/gallery/small/4.jpg",
    "./public/images/gallery/small/5.jpg",
    "./public/images/gallery/small/6.jpg",
    "./public/images/gallery/small/7.jpg",
    "./public/images/gallery/small/8.jpg",
    "./public/images/gallery/small/9.jpg",
    "./public/images/gallery/small/10.jpg",
    "./public/images/gallery/small/11.jpg",
    "./public/images/gallery/small/12.jpg",
    "./public/images/gallery/small/13.jpg",
    "./public/images/gallery/small/14.jpg",
    "./public/images/gallery/small/15.jpg",
    "./public/images/gallery/small/16.jpg",
    "./public/images/gallery/small/17.jpg",
    "./public/images/gallery/small/18.jpg",
    "./public/images/gallery/small/19.jpg",
    "./public/images/gallery/small/20.jpg",   
    "./public/images/gallery/small/21.jpg",
    "./public/images/gallery/small/22.jpg",
    "./public/images/gallery/small/23.jpg",
    "./public/images/gallery/small/24.jpg",
    "./public/images/gallery/small/25.jpg",
    "./public/images/gallery/small/26.jpg",
    "./public/images/gallery/small/27.jpg",
    "./public/images/gallery/small/28.jpg",
    "./public/images/gallery/small/29.jpg",
    "./public/images/gallery/small/30.jpg",
    "./public/images/gallery/small/31.jpg",
    "./public/images/gallery/small/32.jpg",
    "./public/images/gallery/small/33.jpg",
    "./public/images/gallery/small/34.jpg",
    "./public/images/gallery/small/35.jpg",
    "./public/images/gallery/small/36.jpg",
    "./public/images/gallery/small/37.jpg",
    "./public/images/gallery/small/38.jpg",
    "./public/images/gallery/small/39.jpg",
    "./public/images/gallery/small/40.jpg",   
    "./public/images/gallery/small/41.jpg",
    "./public/images/gallery/small/42.jpg",
    "./public/images/gallery/small/43.jpg",
    "./public/images/gallery/small/44.jpg",
    "./public/images/gallery/small/45.jpg",
    "./public/images/gallery/small/46.jpg",
    "./public/images/gallery/small/47.jpg",
    "./public/images/gallery/small/48.jpg",
    "./public/images/gallery/small/49.jpg",
    "./public/images/gallery/small/50.jpg",
    "./public/images/gallery/small/51.jpg",
    "./public/images/gallery/small/52.jpg",
    "./public/images/gallery/small/53.jpg",
    "./public/images/gallery/small/54.jpg",
    "./public/images/gallery/small/55.jpg",
    "./public/images/gallery/small/56.jpg",
    "./public/images/gallery/small/57.jpg",
    "./public/images/gallery/small/58.jpg",
    "./public/images/gallery/small/59.jpg",
    "./public/images/gallery/small/60.jpg",   
]

//for ws communication
var wsServer = new ws({httpServer: httpServer});
wsServer.on("request", function(request) 
{

    //many, small files
    if(request.requestedProtocols.indexOf("gallerymanyfiles") > -1)
    {
        var connection = request.accept("gallerymanyfiles", request.origin);

        //serve favicon.ico
        fs.readFile(favicon, function(error, data)
        {
            connection.sendUTF(jsonBuffer.stringify(
            {
                mimeType: "image/x-icon",
                type: "favicon", 
                data: data
            }));   
        }) 

        //serve all scripts
        scriptPaths.forEach(function(path, index)
        {
            fs.readFile(path, function(error, data)
            {
                connection.sendUTF(jsonBuffer.stringify(
                {
                    mimeType: "text/javascript",
                    type: "script", 
                    data: data,
                    index: index
                }));   
            }) 
        });

        //serve all stylesheets
        stylePaths.forEach(function(path, index)
        {
            fs.readFile(path, function(error, data)
            {
                connection.sendUTF(jsonBuffer.stringify(
                {
                    mimeType: "text/css" ,
                    type: "style", 
                    data: data,
                    index: index + scriptPaths.length
                }));     
            });
        });

        //serve all images
        manySmallimagePaths.forEach(function(path)
        {
            //get mimetype of image.
            var mimeType;
            switch(path.split(".")[path.split(".").length -1])
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

            fs.readFile(path, function(error, data)
            {
                connection.sendUTF(jsonBuffer.stringify(
                {
                    mimeType: mimeType,
                    type: "image", 
                    data: data, 
                    path: path
                }));    
            });
        });
    }

    //few, large files
    else if(request.requestedProtocols.indexOf("galleryfewfiles") > -1)
    {
        var connection = request.accept("galleryfewfiles", request.origin);  
        
        //serve favicon.ico
        fs.readFile(favicon, function(error, data)
        {
            connection.sendUTF(jsonBuffer.stringify(
            {
                mimeType: "image/x-icon",
                type: "favicon", 
                data: data
            }));   
        })

        //serve script
        fs.readFile(scriptFile, function(error, data)
        {
            connection.sendUTF(jsonBuffer.stringify(
            {
                mimeType: "text/javascript",
                type: "script", 
                data: data
            }));   
        }) 


        //serve stylesheet
        fs.readFile(styleFile, function(error, data)
        {
            connection.sendUTF(jsonBuffer.stringify(
            {
                mimeType: "text/css" ,
                type: "style", 
                data: data
            }));     
        });

        //serve all images
        fewLargeImagePaths.forEach(function(path)
        {
            //get mimetype of image.
            var mimeType;
            switch(path.split(".")[path.split(".").length -1])
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

            fs.readFile(path, function(error, data)
            {
                connection.sendUTF(jsonBuffer.stringify(
                {
                    mimeType: mimeType,
                    type: "image", 
                    data: data, 
                    path: path
                }));    
            });
        });      
    }

});