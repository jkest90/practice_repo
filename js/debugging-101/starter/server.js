var express = require('express');

// BUG: failed to create the app from express
// MESSAGE: Browser: The site cannot be reached
// FIX: create the express app
var app = express();

// BUG: the default URL will be localhost(:8080)
// MESSAGE: Browser: The site cannot be reached
// FIX: use localhost:3000 as the URL
var PORT = process.env.port || 3000;


// BUG: don't create the public static path
// MESSAGE: Browser: Cannot GET /index.html
// FIX: create the public static path
app.use(express.static('public'));

app.listen(PORT, function (err) {
    if (err) {
        console.log("Server Error: ", err);
        process.exit(1);
    }
    console.log("Server is up!");

});