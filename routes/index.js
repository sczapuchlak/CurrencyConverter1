var express = require('express');
var router = express.Router();
//retrieves the info from the API
var OERRequest = require('../helpers/oer');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

/* GET a rate from OER service */
router.get('/convert', function(req, res, next){   // include next. It's a function that you can call to transfer control to the next function which will handle this request. In this route, you use it to stop this function and pass control to your error handlers.
   //Get the users amount
    var input = req.query.dollar_amount;
    //use the to and from selections
    var convertTo = req.query.to_currency;
    var convertFrom = req.query.from_currency;

//use the oerrequest function to return calculations
    OERRequest(function(err,oer){
        //use if and else to check for error handling
        if(err){
            return next(err);
        }
        else {
            //gets the currency code from JSON object

            console.log('The data fetched from the api is ', oer)

            // you'll need to do a little more processing. But at this point,
            // your oer variable has the data you need in it.

            var rateTo = oer['rates'][convertTo];
            var rateFrom = oer['rates'][convertFrom];

           //Converts to USD first
            var toDollars = input / rateFrom;
            var result = toDollars * rateTo;

            //  incorrect currency?
            console.log(rateTo + " " + rateFrom);


            //Renders template page with variables
            res.render('results', {input: input, result: result, currencyTo: convertTo, currency: convertFrom})
        }
        });

});



/* Handle currency form submit
router.get('/convert', function(req,res){
    var dollars = req.query.dollar_amount;

    //res.send('To do: convert $' + dollars + ' to ' + convertTo);
   var rateTwo= exchangeRates[convertTo];
   var rate = exchangeRates[convertFrom];
    USCurrency =  dollars*rate;
    result2 = USCurrency/rateTwo;
    if(convertTo == convertFrom){
    */




    module.exports=router;
