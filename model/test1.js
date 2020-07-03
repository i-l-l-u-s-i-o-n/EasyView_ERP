var mongoose=require("mongoose");

var test1Schema =new mongoose.Schema({
    sid: {type:String, unique:true, required: true},
    rcs501: Number,
    rcs502: Number,
    rcs503: Number
});



// Compiling schema into MODEL to use various methods.
var Test1=mongoose.model("Test1",test1Schema);

module.exports= Test1;