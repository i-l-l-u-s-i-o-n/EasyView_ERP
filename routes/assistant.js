'use strict';

// Import the Dialogflow module from the Actions on Google client library.
// const {dialogflow} = require('actions-on-google');

// Import the firebase-functions package for deployment.
// const functions = require('firebase-functions');
var express  = require('express');
var router = express.Router();

// Instantiate the Dialogflow client.
// const app = dialogflow({debug: true});

const webhook='WEBHOOK'

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.


router.post("/",function(req,res){
    // app.intent('handleWelcome', (conv) => {
    //     conv.close('Hello Shivam, this response is from ' + webhook);
    // });
    var resObj={
        "fulfillmentText" : "Welcome shivam to easyview via webhook.",
        "fulfillmentMessages":[ {"text": {"text": ["Welcome shivam to easyview via webhook." ]}}]
    }
    return res.json(resObj);
})


// Set the DialogflowApp object to handle the HTTPS POST request.
// exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

// server.listen((process.env.PORT || 3000), function () {
//     console.log("Server is up and listening on port" + process.env.PORT);
// });


module.exports= router;

