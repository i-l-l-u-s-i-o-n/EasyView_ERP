var mongoose=require("mongoose");

var studentDetailSchema =new mongoose.Schema({
    sno:String,
    sid:String,
    name:String,
    email: {type:String, unique:true, required: true},
    mno:String,
    rno:String
});



// Compiling schema into MODEL to use various methods.
var Student=mongoose.model("StudentDetails",studentDetailSchema);

module.exports= Student;