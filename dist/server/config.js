var config = {}
 
config.db = {};
config.server = {};
config.server.port = process.env.WEB_PORT || 3000; //Prod port
//config.db.address ='mongodb://localhost:27017/vldb';
 
module.exports = config;