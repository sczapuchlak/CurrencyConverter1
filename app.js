var  express = require('express');
var routes = require('./routes/index');
var path = require('path');
var exp_hbs = require('express-handlebars');

var routes = require('./routes/index');
var about = require('./routes/about');

var app = express();

app.engine('.hbs', exp_hbs({
    extname: '.hbs',
    defaultLayout: 'main'
}));

app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, 'static')));

app.use('/', routes);
app.use('/about', about);

app.listen(process.env.PORT || 3000, function(){
    console.log('Currency app.js running on port 3000');
});

module.experts = app;