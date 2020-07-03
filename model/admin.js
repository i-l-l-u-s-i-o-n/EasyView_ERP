var mongoose=require("mongoose");
var passLocalMongoose = require("passport-local-mongoose");

var adminSchema =new mongoose.Schema({
    username:String,
    name:String,
    password: String,
    email: {type:String, unique:true, required: true}  ,
    mno:String,
    country:String,
    city:String,
    type:String

});


adminSchema.plugin(passLocalMongoose);

// Compiling schema into MODEL to use various methods.
var Admin=mongoose.model("Admin",adminSchema);

module.exports= Admin;