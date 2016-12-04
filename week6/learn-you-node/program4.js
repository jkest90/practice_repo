// My first async I/O
var fs = require('fs');
var buf = fs.readFile(process.argv[2], function callback(err, buf) {
    var subStrings = buf.toString().split('\n');
    console.log(subStrings.length - 1);
});