var config = require('./config')

var express = require('express');
//var path = require('path');
//var mongo = require('mongoskin');
//var cookieSession = require('cookie-session');

var app = module.exports = express();
app.set('view engine', 'ejs');

//app.use(require('index-module'));
//app.use(require('./lib/custom-lp'));

app.get('/', function(req, res){ 
 res.render('index');
 });



app.listen(config.server.port, function () {
	console.log('# Listening on port ' + config.server.port);
});


//for the development process
app.set('json spaces', 3);