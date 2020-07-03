
      
var express= require("express");

// Here we are using express router instead of app itself.
var router = express.Router();

var Student=require("../model/student"),
    studentDetails = require("../model/studentDetails"),
    test1=require("../model/test1"),
    test2=require("../model/test2"),
    test3=require("../model/test3"),
    attendance=require("../model/attendance");
var 
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    passport            = require("passport"),
    LocalStrategy       = require ("passport-local"),
    crypto              = require("crypto"),
    flash               = require("connect-flash");



router.get("/login",function(req,res){
    res.render("student/login");
})


// Login logic 
router.post("/login", passport.authenticate("student-local", {
    successRedirect: "/studentHome",
    failureRedirect: "/student/login"
}), function(req,res){
});


router.get("/register",function(req,res){
    res.render("student/register");
})

// Sign Up logic
router.post("/register",function(req,res){
    
    var newUser=new Student({username: req.body.username});
    console.log(newUser)
    // Following allows to add password in a HASHED format. i.e a salt and a hash value.
    Student.register(newUser, req.body.password, function(err, user){
        if (err) {
            console.log(err)
             req.flash("error", err.message);
             res.render("student/register");
        }
        passport.authenticate("student-local")(req,res, function(){
             req.flash("success", "Welcome to YelpCamp "+ user.username );
             console.log("logged");
            res.redirect("/studentHome")
        });
    });
});

// ViewMarks Route
router.get("/viewMarks",function(req,res){
    res.render("student/studentSidebar/viewMarks")
})

router.get("/marks",function(req,res){

    var test =req.query.test;

    if(test==1){
        test1.aggregate([
            {
              $lookup:
                {
                // This must be the name in mongo db collection, not the name of our model!!!!!!!!!!!
                  from: "studentdetails",
                  localField: "sid",
                  foreignField: "sid",
                  as: "details"
                }
           }
         ],function(err, result){
                res.render("student/studentSidebar/marks",{testData: result})
         })
    }else if(test==2){
        test2.find({}, function(err, testData){
            if(err){
                console.log(err);
            } else {
               res.render("admin/feeDetails",{students:allStudents});
            }
        });
    }else{
        test3.find({}, function(err, testData){
            if(err){
                console.log(err);
            } else {
               res.render("admin/feeDetails",{students:allStudents});
            }
        });
    }
})



// Result Dashboard
router.get("/viewResultDashboard",function(req,res){
    res.render("student/studentSidebar/viewResultDashboard")
})

router.get("/resultDashboard",function(req,res){

    var spawn = require("child_process").spawn;
            var process = spawn('python', ["pythonScripts/marks.py",
            req.query.csv,
            req.query.sub, 
            req.query.sid, 
          ]);
            console.log("Waiting for data.")
            process.stdout.on("data", function (data) {
                console.log(data.toString())
                result =data.toString().split(" ")
                // console.log(result)
                rank = { dbms: Number(result[1])+1, daa: Number(result[2])+1, ppl: Number(result[3])+1}
                console.log(rank)
                res.render("student/studentSidebar/resultDashboard",{result:rank })
             });
    // res.render("student/studentSidebar/resultDashboard")
})


// Attendance
router.get("/attendance",function(req,res){
    attendance.aggregate([
        {
          $lookup:
            {
            // This must be the name in mongo db collection, not the name of our model!!!!!!!!!!!
              from: "studentdetails",
              localField: "sid",
              foreignField: "sid",
              as: "details"
            }
       }
     ],function(err, result){
            res.render("student/studentSidebar/attendance",{attendance: result})
     })
})

// Attendance Dashboard
router.get("/attendanceDashboard",function(req,res){
    
    var spawn = require("child_process").spawn;
            var process = spawn('python', ["pythonScripts/attendance.py",
            req.query.csv,
            req.query.sub, 
            req.query.sid, 
          ]);
            console.log("Waiting for data.")
            process.stdout.on("data", function (data) {
                console.log(data.toString())
                var result = data.toString()
                res.render("student/studentSidebar/attendanceDashboard",{result : result})
             });
})

////////////////////////////////////////////////////////////////////////////////////
router.get("/", executePy)
function executePy(req, res) {
    // using spawn instead of exec, prefer a stream over a buffer
    // to avoid maxBuffer issue
    var spawn = require("child_process").spawn;
    var process = spawn('python', ["plot.py"]);
    console.log("Waiting for data.")
    process.stdout.on("data", function (data) {
        res.render("admin/pyTest")
        // res.send(data.toString());
    });
  };
////////////////////////////////////////////////////////////////////////////////////

// Logout route 
router.get("/logout", function(req,res){
    req.logout();
    req.flash("success" , "Successfully Logged Out !")
    res.redirect("/");
})
module.exports=router;