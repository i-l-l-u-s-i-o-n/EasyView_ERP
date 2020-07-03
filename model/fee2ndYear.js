
var mongoose=require("mongoose");
var passLocalMongoose = require("passport-local-mongoose");

var feeSchema =new mongoose.Schema({
    
    college_id: String,
    name: String,
    branch:String,
    due_amt:String
    
});


feeSchema.plugin(passLocalMongoose);

// Compiling schema into MODEL to use various methods.
var Fee=mongoose.model("Fee2ndYear",feeSchema);

module.exports= Fee;

