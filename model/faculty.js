var mongoose=require("mongoose");
var passLocalMongoose = require("passport-local-mongoose");

var facultySchema =new mongoose.Schema({
    username:{type:String, unique:true, required: true},
    password: String,   
});


facultySchema.plugin(passLocalMongoose);

// Compiling schema into MODEL to use various methods.
var faculty=mongoose.model("faculty",facultySchema);

module.exports= faculty;