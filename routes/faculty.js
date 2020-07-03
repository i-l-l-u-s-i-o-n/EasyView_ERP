var express = require("express");

var router = express.Router()

var Faculty = require("../model/faculty"),
    passport = require("passport"),
    attendance = require("../model/attendance"),
    test1 = require("../model/test1");




router.get("/login", function (req, res) {
    res.render("faculty/login");
})


// Login logic 
router.post("/login", passport.authenticate("faculty-local", {
    successRedirect: "/facultyHome",
    failureRedirect: "/faculty/login"
}), function (req, res) {
});


router.get("/register", function (req, res) {
    res.render("faculty/register");
})

// Sign Up logic
router.post("/register", function (req, res) {

    var newUser = new Faculty({ username: req.body.username });
    console.log(newUser)
    // Following allows to add password in a HASHED format. i.e a salt and a hash value.
    Faculty.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err)
            req.flash("error", err.message);
            res.render("faculty/register");
        }
        passport.authenticate("faculty-local")(req, res, function () {
            req.flash("success", "Welcome to EasyView " + user.username);
            console.log("logged");
            res.redirect("/facultyHome")
        });
    });
});


router.get("/analyzeAttendance", function (req, res) {

    var spawn = require("child_process").spawn;
    var process = spawn('python', ["pythonScripts/analyzeAttendance.py",
        req.query.csv,
    ]);
    console.log("Waiting for data.")
    process.stdout.on("data", function (data) {
        console.log(data.toString())
        var result = data.toString().split(" ")
        res.render("faculty/facultySidebar/analyzeAttendance", { result: result })
    });

})

router.get("/analyzeAttendancePlotly", function (req, res) {

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
    ], function (err, result) {

        // console.log(result)
        var below = []
        var middle = []
        var above = []

        for (let i = 0; i < result.length; i++) {
            if (result[i].total < 60) {
                below.push(result[i].total)
            } else if (result[i].total >= 75) {
                above.push(result[i].total)
            } else {
                middle.push(result[i].total)
            }
        }

        var final_data = [below.length, middle.length, above.length]
        console.log(final_data)

        res.render('faculty/facultySidebar/analyzeAttendancePlotly', { result: final_data })
    })
    // res.render('faculty/facultySidebar/analyzeAttendancePlotly',{result : [14,31]})
})

router.get("/analyzeResultPlotly", function (req, res) {

    test1.find({}, function (err, result) {

        var dbms = []
        var daa = []
        var ppl = []
        for (let i = 0; i < result.length; i++) {
            dbms.push(result[i].rcs501)
            daa.push(result[i].rcs502)
            ppl.push(result[i].rcs503)
        }
        console.log(daa.filter((x) => x > 23))
        console.log(ppl.filter((x) => x > 23))


        var final_result = {

            dbms_fail: dbms.filter((x) => x < 15).length,
            dbms_avg: dbms.filter((x) => x >= 15 && x<23).length,
            dbms_aboveAvg: dbms.filter((x) => x >= 23).length,
            daa_fail: daa.filter((x) => x < 15).length,
            daa_avg: daa.filter((x) => x >= 15 && x<23).length,
            daa_aboveAvg: daa.filter((x) => x >= 23).length,
            ppl_fail: ppl.filter((x) => x < 15).length,
            ppl_avg: ppl.filter((x) => x >= 15 && x<23).length,
            ppl_aboveAvg: ppl.filter((x) => x >= 23).length
        }
        console.log(final_result)
        
        res.render('faculty/facultySidebar/analyzeResultPlotly', { result: final_result })

    })
})



router.get("/analyzeResult", function (req, res) {

    var spawn = require("child_process").spawn;
    var process = spawn('python', ["pythonScripts/analyzeResult.py",
        req.query.csv,
    ]);
    console.log("Waiting for data.")
    process.stdout.on("data", function (data) {
        console.log(data.toString())
        var result = data.toString().split(" ")
        res.render("faculty/facultySidebar/analyzeResult", { result: result })
    });

})


router.get("/sendAttendanceReminder", function (req, res) {
    var nodemailer = require('nodemailer');

    // create reusable transporter object using the default SMTP transport
    var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'easyview.action@gmail.com',
            pass: "easyview123"
        }
    });


    var mailList = []
    var content = []

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
    ], function (err, result) {
        // console.log(result)
        result.forEach(element => {
            if (element.total < 60) {
                content.push(element.total);
                mailList.push(element.details[0].email)
            }
        });

        console.log(content)
        mailList.push("shivam.dev1097@gmail.com")
        mailList.forEach(function (user, index) {

            if (user == 'shivam00035@gmail.com' || user == 'shivamshukla2297@gmail.com' || user == 'shivam.dev1097@gmail.com') {
                var mailOptions = {
                    to: user,
                    from: 'EasyView <easyview.action@gmail.com>',
                    subject: 'Short Attendance Reminder',
                    text: "Your attendance is " + content[index] + "%. So you are instructed to attend the class on regular basis to keep your attendance above 60%."
                };
                smtpTransport.sendMail(mailOptions, function (err) {
                    console.log('mail sent');

                    // res.send('/analyzeAttendance');
                    // done(err, 'done');
                });
            }
            // mailList.forEach(function(user, index ){
            //     var mailOptions = {
            //         to: user,
            //         from: 'EasyView <easyview.action@gmail.com>',
            //         subject: 'Short Attendance Reminder',
            //         text: content[index]
            //     };
            //     smtpTransport.sendMail(mailOptions, function (err) {
            //         console.log('mail sent');

            //         // res.send('/analyzeAttendance');
            //         // done(err, 'done');
            //         console.log('sent')
            //     });

            // })


        })
    })

    req.flash('success', 'Reminder has been sent to all students!');
    res.redirect('/faculty/analyzeAttendancePlotly');
})

module.exports = router;

