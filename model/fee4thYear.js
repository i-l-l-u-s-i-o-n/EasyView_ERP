
var mongoose=require("mongoose");
var passLocalMongoose = require("passport-local-mongoose");

var feeSchema =new mongoose.Schema({
    name: String,
    college_id: {type:String, unique:true, required: true}  ,
    due_amt:String,
    branch:String
});


feeSchema.plugin(passLocalMongoose);

// Compiling schema into MODEL to use various methods.
var Fee=mongoose.model("Fee4thYear",feeSchema);

module.exports= Fee;

