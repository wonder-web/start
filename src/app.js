var config = require('./config')

var express = require('express'),
	ejs 	= require('ejs'),
	glob	= require('glob'); /* to search through module folders for .css */

var app = module.exports = express();
/* views is a configuration variable that sets folder
   from which express will grab templates */
app.set('views', __dirname); 
app.set('view engine', 'ejs');
app.use(express.static(__dirname));

//searching for all .css files in styles folders inside the modules
var allcss = glob.sync("*/styles/*.css");
console.log(allcss);

app.get('/', function(req, res){ 
	res.render('index-module/index.ejs', {allcss: allcss});
});


app.listen(config.server.port, function () {
	console.log('# Listening on port ' + config.server.port);
});