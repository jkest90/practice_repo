 // My First I/O
 var fs = require('fs');
 var buf = fs.readFileSync(process.argv[2]);
 var subStrings = buf.toString().split('\n');
 console.log(subStrings.length-1);
