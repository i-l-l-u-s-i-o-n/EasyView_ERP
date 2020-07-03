
      
var express= require("express"),
attendance=require("../model/attendance");

const csvtojson = require("csvtojson");

// Here we are using express router insted of app itself.
var router = express.Router();

// var middleware = require("../middleware/index.js");


router.get("/",function(req,res){
    res.render("home");
})

// router.get("/home",function(req,res){

//     res.render("home");
// })


router.get("/studentHome",function(req,res){
    res.render("student/studentHome");
})

router.get("/facultyHome",function(req,res){
  res.render("faculty/facultyHome");
})

router.get("/adminHome",function(req,res){
    res.render("admin/adminHome");
})


// Python Testing route
router.get("/pyGraph", executePy);


function executePy(req, res) {
    // using spawn instead of exec, prefer a stream over a buffer
    // to avoid maxBuffer issue
    var spawn = require("child_process").spawn;
    var process = spawn('python', ["script.py",
      req.query.funds, // starting funds
      req.query.size, // (initial) wager size
      req.query.count, // wager count — number of wagers per sim
      req.query.sims // number of simulations
    ]);
    console.log("Waiting for data.")
    process.stdout.on("data", function (data) {
        res.render("admin/pyTest")
        // res.send(data.toString());
    });
  };


///// Insert Data Route
router.get("/insertData",function(req,res){


    // Inserting the csv data to database.
    csvtojson()
    .fromFile("attendance.csv")
    .then(csvData => {
        console.log(csvData);
      attendance.insertMany(csvData, (err, res) => {
        if (err) throw err;
        console.log(`Inserted: ${res.insertedCount} rows`);
        //client.close();
        console.log("Inserted")
      });
      });
})



module.exports= router;