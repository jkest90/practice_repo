// include the built-in modules http and fs ("file system")
var http = require('http');


///////////////////////////////////////////////////////////////
var respondString = function (req, res) {
    res.end("hello world")
}
// create a nodejs server using the http module
var server = http.createServer(respondString);
// start the server listening to port 1337
server.listen(1331);


///////////////////////////////////////////////////////////////
var fs = require('fs');
var respondTextFile = function (req, res) {
	fs.readFile('data.txt', function readData(err, data) {
		// set the status code of the HTTP response to 200 which indicates success
		// set the Content-Type to text/plain
		res.writeHead(200, { 'Content-Type': 'text/plain' });
		// output the data in the response
		res.end(data);
}
// chain the listen function to the createServer function
http.createServer(respondTextFile).listen(1332);


///////////////////////////////////////////////////////////////
// pass the respond function to createServer anonymously
http.createServer(function (req, res) {
	fs.readFile('index.html', function readData(err, data) {
		// set the status code of the HTTP response to 200 which indicates success
		// set the Content-Type to text/html
		res.writeHead(200, { 'Content-Type': 'text/html' });
		// output the data in the response
		res.end(data);
	})
}).listen(1333);

///////////////////////////////////////////////////////////////
// use express as your http server
var express = require('express');
var app = express();
// serve all files found in the ./public directory
app.use(express.static('public'));
app.listen(1335, function (err) {
	if (err) {
		console.log("Server Error: ", err);
		process.exit(1);
	}
});
