var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var helpers = require('../web/http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
    // console.log(req);
  // res.end(archive.paths.list);

  if(req.method === 'GET'){
    if (req.url === '/') {
      console.log('Serving Main Page');
      res.writeHead(200, {'Content-Type': 'text/html'});
      archive.isUrlInList("www.google.com",function(doesExist){
        console.log(doesExist);
      });
      helpers.serveAssets(res);
    }
    // else {
    //   res.writeHead(200, {'Content-Type': 'text/html'});
    //   res.end();
    // }
  }
  else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404: Not Found');
  }

  // res.end(archive.paths.list);
};
