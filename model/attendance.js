var mongoose=require("mongoose");

var attendanceSchema =new mongoose.Schema({
    sid: {type:String, unique: true, required:true},
    rcs501: Number,
    rcs502: Number,
    rcs503: Number,
    total: Number
})

// Compiling schema into MODEL to use various methods.
var Attendance=mongoose.model("attendance",attendanceSchema);

module.exports= Attendance;