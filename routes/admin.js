     var express = require("express");

     // Here we are using express router instead of app itself.
     var router = express.Router();

     var Admin = require("../model/admin"),
         fee2 = require("../model/fee2ndYear");
     var WebSocket = require("ws"),
         mongoose = require("mongoose"),
         bodyParser = require("body-parser"),
         passport = require("passport"),
         LocalStrategy = require("passport-local"),
         crypto = require("crypto"),
         flash = require("connect-flash");
     router.use(bodyParser.urlencoded({ extended: true }))


     const url = 'wss://web-socket-by-shivam.herokuapp.com/'
     const ws = new WebSocket(url)



     router.get("/register", function(req, res) {
         res.render("admin/adminRegister");
     })
     router.get("/login", function(req, res) {
         res.render("admin/adminLogin");
     })

     // Login logic 
     router.post("/login", passport.authenticate("admin-local", {
         successRedirect: "/adminHome",
         failureRedirect: "/admin/login"
     }), function(req, res) {});

     // SignUp logic for admin
     router.post("/register", function(req, res) {

         var newInst = new Admin({
             email: req.body.username,
             username: req.body.username,
             name: req.body.institute.name,
             city: req.body.institute.city,
             country: req.body.institute.country,
             mno: req.body.institute.mno
         });

         // Following allows to add password in a HASHED format. i.e a salt and a hash value.

         console.log(newInst);
         Admin.register(newInst, req.body.password, function(err, user) {
             if (err) {
                 console.log(err)
                 req.flash("error", err.message);
                 return res.render("admin/adminRegister");
             }
             passport.authenticate("admin-local")(req, res, function() {
                 req.flash("success", "Welcome to YelpCamp " + user.username);
                 res.redirect("/adminHome")
             });
         });
     });

     // Logout route 
     router.get("/logout", function(req, res) {
         req.logout();
         req.flash("success", "Successfully Logged Out !")
         res.redirect("/");
     })



     //////////////////////////////////// Sidebar routes /////////////////////////////////////////////

     router.get("/viewFeeDetails", function(req, res) {
         res.render("admin/viewFeeDetails");
     })



     router.get("/feeDetails", function(req, res) {
         console.log(req.query.course);



         var yr = req.query.year;
         var course = req.query.course;
         var branch = req.query.branch;

         if (yr == 2) {
             fee2.find({ branch: branch }, function(err, allStudents) {
                 if (err) {
                     console.log(err);
                 } else {
                     res.render("admin/feeDetails", { students: allStudents });
                 }
             });

         }

         var msg = {
             type: 'name',
             name: 'Shivam'
         }
         ws.send(JSON.stringify(msg));

         console.log("message sent from admin")
         ws.on('message', function(message) {
             var msg = JSON.parse(message);
             console.log(JSON.stringify(msg));

             if (msg.type == 'attendance') {
                 ws.send(JSON.stringify({ type: 'ga_output', output: 90, user: 'Shivam' }));
                 console.log("Messeage sent to GAAAAAA from admin")

             }

         });

     })


     module.exports = router;