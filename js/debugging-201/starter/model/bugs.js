var mongoose = require('mongoose');

var daBugSchema = mongoose.Schema( {
    name: {type: String},
    file : {type:String},
    lineNo: {type:Number, required:true},
    messages: {type:Array, default:[]}
});

module.exports = mongoose.model('DaBug', daBugSchema);