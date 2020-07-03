var mongoose=require("mongoose");

var test2Schema =new mongoose.Schema({
    sid: {type:String, unique:true, required: true},
    rcs501: Number,
    rcs502: Number,
    rcs503:Number
});



// Compiling schema into MODEL to use various methods.
var Test2=mongoose.model("Test2",test2Schema);

module.exports= Test2;