var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
// var CronJob = require('cron').CronJob;

// Why do you think we have this here?
// HINT:It has to do with what's in .gitignore
initialize();

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

// new CronJob('30 * * * * *', function(){
//     console.log('You will see this message every minute');
// }, null, true, "America/Los_Angeles");
