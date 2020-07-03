var mongoose=require("mongoose");
var passLocalMongoose = require("passport-local-mongoose");

var studentSchema =new mongoose.Schema({
    username:{type:String, unique:true, required: true},
    password: String,   
});


studentSchema.plugin(passLocalMongoose);

// Compiling schema into MODEL to use various methods.
var Student=mongoose.model("Student",studentSchema);

module.exports= Student;