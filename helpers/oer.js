var request = require('request');
var moment = require('moment');

var baseURL = 'https://openexchangerates.org/api/latest.json/';

// Makes requests to the OER service using request.
// A callback checks for errors and then calls a method to
// process the JSON and return a page to the client.
function OERRequest(callback) {
    var queryParam = {'app_id': APIKEY};
    var APIKEY = process.env.OER_API_KEY;
    console.log(process.env.OER_API_KEY);


//Use request module to request data from OER service.
//Must handle result in callback.
    request({uri: baseURL, qs: queryParam}, function (error, oer_response, body) {

        if (!error && oer_response.statusCode == 200) {
            //No error, and there is a response from OER. Expect the response to be a string.
            //console.log("NASA SAYS \n" + JSON.stringify(body));
            var oerJSON = JSON.parse(body);   //Convert JSON text to a JavaScript object
            var jsonForTemplate = processOERresponse(today, oerJSON);  // Rearrange JSON into a more useful format for display in the template
            callback(jsonForTemplate);
        }

        else {
            //Log error info to console and return error with message.
            console.log("Error in JSON request: " + error);
            console.log(oer_response);
            console.log(body);
            callback(null, Error("Error fetching data"));
        }
    });
}



module.exports=OERRequest;