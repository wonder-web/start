'use strict';

let config = require('./config')

let express = require('express'),
	ejs 	= require('ejs'),
	glob	= require('glob'), /* to search through module folders for .css */
	path	= require('path');

let app = module.exports = express();
let baseDir = path.join(__dirname, '../client/');
console.log(`Base dir: ${baseDir}`);

/* views is a configuration variable that sets folder
   from which express will grab templates */
app.set('views', baseDir); 
app.set('view engine', 'ejs');
app.use(express.static(baseDir));

//searching for all .css files in styles folders inside the modules
let allcss = glob.sync(path.join(baseDir, "**/styles/*.css")); 
allcss = allcss.map(css => path.relative(baseDir, css));

console.log(allcss);

app.get('/', function(req, res){ 
	res.render('0-index-module/index.ejs', {allcss: allcss});
});


let port = process.env.PORT || config.server.port;
app.listen(port, function () {
	console.log('# Listening on port ' + config.server.port);
});