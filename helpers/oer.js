var request = require('request');
var baseURL = 'https://openexchangerates.org/api/latest.json/';

// Makes requests to the OER service using request.
// A callback checks for errors and then calls a method to
// process the JSON and return a page to the client.
function OERRequest(callback) {
    var APIKEY = process.env.OER_API_KEY;
    console.log(process.env.OER_API_KEY);
    var queryParam = {'app_id': APIKEY};


//Use request module to request data from OER service.
//Must handle result in callback.
    request({uri: baseURL, qs: queryParam}, function (error, oer_response, body) {

        if (!error && oer_response.statusCode == 200) {
            // Exception handler for parsing object.
            try {
                // Parses the returned data.
                var oerJSON = JSON.parse(body);
            } catch (error) {
                return callback(error);   // just for catching JSON parsing errors.
            }
            // Only gets to this point if no errors. Returns the parsed JSON object.
            return callback(null, oerJSON.rates);
        }
        // Errors display.
        else {
            console.log("Error in JSON request: " + error);
            console.log(oer_response);
            console.log(body);
            return callback(error);
        }
    });
}

module.exports=OERRequest;
