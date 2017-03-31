var express = require('express');
var router = express.Router();
var oer = require('../helpers/oer');
var OERRequest = require('oer.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Open Exchange Rates' });
});

/* GET a rate from OER service */
router.get('/fetch_picture', function(req, res, next){
    if (req.query.today) {
        apod(function(data, error){
            if (error) {
                return res.render('apod_Error', { error : error.message });
            }
            return res.render('picture', { apod : data });
        }, true);
    }

    else if (req.query.random) {
        apod(function(data, error) {
            if (error) {
                return res.render('apod_error', { error : error.message });
            }
            return res.render('picture', { apod : data });
        });

    } else {
        next();// Send to next route handler.
        // Since we haven't defined one, this will end up at the 404 error handler
        //  }});
    }
});


//
OERRequest.rates


 /* Handle GET request for home page*/
router.get('/', function(req, res){
    res.render('index');
});

/* Handle currency form submit*/
router.get('/convert', function(req,res){
    var dollars = req.query.dollar_amount;
    var convertTo = req.query.to_currency;
    var convertFrom = req.query.from_currency;
    //res.send('To do: convert $' + dollars + ' to ' + convertTo);
   var rateTwo= exchangeRates[convertTo];
   var rate = exchangeRates[convertFrom];
    USCurrency =  dollars*rate;
    result2 = USCurrency/rateTwo;
    if(convertTo == convertFrom){

    }
    res.render('results', {dollars: dollars, UsCurrency: USCurrency, result2: result2, currency: convertFrom})
});


    module.exports=router;
