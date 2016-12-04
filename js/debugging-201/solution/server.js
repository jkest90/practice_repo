var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    // BUG: leave the . off the beginning of the path to routes
    // MESSAGE:Error: Cannot find module '/controllers/routes'...at Object.<anonymous> (/Users/steve/Google Drive/Projects/RefactorU/exercise-solutions/js/debugging/solution/server.js:7:14)
    // FIX: add . to make it a relative path
    // routes = require('/controllers/routes');
    routes = require('./controllers/routes');

var app = express();

// BUG: the default URL will be localhost(:8080)
// MESSAGE: Browser: The site cannot be reached
// FIX: use localhost:3000 as the URL
var PORT = process.env.port || 3000;

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

// include static routes for serving up static html files.
app.use(express.static('public'));

// make our database connection
mongoose.connect('mongodb://localhost/bugs', function (err) {
    // BUG: if mongod process is not already running this will fail
    // MESSAGE:  Console: Could not connect to Mongo
    // FIX: start mongod as sudo
    if (err) {
        console.log("Could not connect to Mongo");
        process.exit(1);
    };
    console.log('Mongo is connected');
});

// call our routes
routes(app);

app.listen(PORT, function (err) {
    if (err) {
        console.log("Server Error: ", err);
        process.exit(1);
    }
    console.log("Server is up!");

});