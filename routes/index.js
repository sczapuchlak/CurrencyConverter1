var express = require('express');
var router = express.Router();

// exchange rates
 var exchangeRates = { 'EUR' : 0.94, 'JPY' : 112.86, 'IR': .015, 'EP': .063, 'BITCOIN': 1192.58,'USD': 1.00};


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
   res.render('results', {dollars: dollars, UsCurrency: USCurrency, result2: result2, currency: convertFrom})
});
    module.exports=router;