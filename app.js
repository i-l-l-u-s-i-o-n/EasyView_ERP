var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    crypto = require("crypto"),
    flash = require("connect-flash"),
    Student = require("./model/student"),
    Admin = require("./model/admin"),
    Faculty = require("./model/faculty"),
    WebSocket = require("ws");

// const url = 'wss://sheltered-escarpment-84409.herokuapp.com/'
const url = 'wss://web-socket-by-shivam.herokuapp.com/'

const connection = new WebSocket(url)

var app = express();
var PORT = process.env.PORT || 3000;

var indexRoute = require("./routes/index"),
    studentRoute = require("./routes/student"),
    adminRoute = require("./routes/admin"),
    facultyRoute = require("./routes/faculty"),
    assistantRoute = require("./routes/assistant");

// mongoose.connect("mongodb://localhost:27017/projectX",{ useNewUrlParser: true })

// Connecting to Mongo DB using mongoose.
mongoose.connect("mongodb+srv://shivam:Shivam22%40@cluster0-p07bd.mongodb.net/projectX?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    // mongodb+srv://shivam:<password>@cluster0-p07bd.mongodb.net/test?retryWrites=true&w=majority
    //Using body parser to read data from the parameter send using POST requests.
app.use(bodyParser.urlencoded({ extended: true }))

// Doing this will consider all the file to be rendered as EJS(embedded JS)
app.set("view engine", "ejs");

//Using public directory
app.use(express.static(__dirname + "/public"));
// __dirname specifies the path where our main script(app.js) is located.



// PASSPORT CONFIGURATION ->>>>>>>>>>>>>>>>

app.use(require("express-session")({
    secret: "Let the success make the noise!",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
// app.locals.moment = require('moment');
app.use(passport.initialize());
app.use(passport.session());



// passport.use(new LocalStrategy(Student.authenticate()));
// passport.serializeUser(Student.serializeUser());
// passport.deserializeUser(Student.deserializeUser());


// passport.use(new LocalStrategy(Institute.authenticate()));
// // {username: 'institute.email', password:'institute.password'}
// passport.serializeUser(Institute.serializeUser());
// passport.deserializeUser(Institute.deserializeUser());

//////////////////////////////////////////////////////////////////////////


// add other strategies for more authentication flexibility
passport.use('student-local', new LocalStrategy(
    //   function(username, password, done) {
    //     Student.findOne({
    //       username : username
    //     }, function(err, user) {
    //       if (err) return done(err);

    //       if (!user) {
    //         return done(null, false, {
    //           message: 'This email is not registered.'
    //         });
    //       }
    //       if (!user.authenticate(password)) {
    //         return done(null, false, {
    //           message: 'This password is not correct.'
    //         });
    //       }
    //       return done(null, user);
    //     });
    //   }
    // ));
    Student.authenticate()));

// add other strategies for more authentication flexibility
passport.use('admin-local', new LocalStrategy(
    //   function(username, password, done) {
    //       Institute.findOne({
    //           username : username
    //       }, function(err, institute) {
    //           if (err) return done(err);

    //           if (!institute) {
    //               return done(null, false, {
    //                   message: 'This email/username is not registered.'
    //               });
    //           }
    //           if (!institute.authenticate(password)) {
    //               return done(null, false, {
    //                   message: 'This password is not correct.'
    //               });
    //           }
    //           return done(null, institute);
    //       });
    //   }
    Admin.authenticate()));

passport.use('faculty-local', new LocalStrategy(Faculty.authenticate()))


passport.serializeUser(function(user, done) {
    // Institute.findOne({
    //     username : user
    // }, function(err, institute) {
    //     if (!err) 
    //         return done(null, institute);
    //     });
    //     Student.findOne({
    //         username : user
    // }, function(err, student) {
    //     if (!err) 
    //         return done(null, student);
    //     });
    done(null, user)
});


passport.deserializeUser(function(user, done) {

    // Institute.findOne({
    //     username : user
    // }, function(err, institute) {
    //     if (!err) 
    //         return done(null, institute);
    //     });
    //     Student.findOne({
    //         username : user
    // }, function(err, student) {
    //     if (!err) 
    //         return done(null, student);
    //     });
    done(null, user)
});



//   // serialize
//     passport.serializeUser(function(user, done) {            
//         if (isUser(user)) {
//         // serialize user
//         } else if (isSponsor(user)) {
//         // serialize company
//         }
//     });
//////////////////////////////////////////////////////////////////////////

// We have all the data about user in the "req.user".
// The PASSPORT put the username and ID to the user object ......

// So we can pass the user object to out ejs files to display username or for some other stuff.
// { _id: 5cf2587bf8bb5c09810b1cdc, username: 'Shivam', __v: 0 }
// Instead of passing req.user to all the routes , we can simply create following middleware.

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next(); // Next specifies to continue execution which is mostly route handeling(the callbacks).
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use("/", indexRoute);
app.use("/student", studentRoute);
app.use("/assistant", assistantRoute);
app.use("/faculty", facultyRoute);
app.use("/admin", adminRoute);




app.listen(PORT, function() {
    console.log("SERVER STARTED!!");
});