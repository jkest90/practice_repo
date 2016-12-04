var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    routes = require('/controllers/routes');

var app = express();

var PORT = process.env.port || 3000;

app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

// include static routes for serving up static html files.
app.use(express.static('public'));

// make our database connection
mongoose.connect('mongodb://localhost/bugs', function (err) {
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