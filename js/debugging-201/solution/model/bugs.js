var mongoose = require('mongoose');

var daBugSchema = mongoose.Schema( {
    name: {type: String},
    file : {type:String},
    // BUG: property lineNo should be lineNumber, and it is required so it will fail.
    // MESSAGE:  Dev Console: Object {message: "DaBug validation failed", name: "ValidationError", errors: Object}
    // FIX: change lineNo to lineNumber
    // lineNo: {type:Number, required:true},
    lineNumber: {type:Number, required:true},
    messages: {type:Array, default:[]}
});

module.exports = mongoose.model('DaBug', daBugSchema);