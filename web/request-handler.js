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
      console.log('GET: Main Page');
      res.writeHead(200, {'Content-Type': 'text/html'});
      // archive.isUrlInList("www.google.com",function(doesExist){
      //   console.log(doesExist);
      // });
      helpers.serveAssets(res, './web/public/index.html');
      // archive.downloadUrl();
    }
    else if (req.url.toString().match("www") !== null) {
      console.log('GET: Previously Processed URL');
      // console.log(req.url.toString().match("www") !== null);
      res.writeHead(200, {'Content-Type': 'text/html'});
      // TODO: Actually load the file
      archive.isURLArchived(req.url, function(doesExist){
        if (doesExist) {
          helpers.serveAssets(res, './archives/sites' + req.url);
        }
      });
    }
    else {
      console.log('GET: 404 - Not Found; URL: ' + req.url);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404: Not Found');
    }
  }
  else if(req.method === 'POST') {
    if (req.url === '/') {
      console.log('POST: New Sites');
      res.writeHead(302, {'Content-Type': 'text/html'});
      req.on('data', function(newUrl){
        var url = newUrl.slice(4);

        archive.isURLArchived(url, function(doesExist){
          if (doesExist) {
            helpers.serveAssets(res, './archives/sites/' + url);
          } else {
            archive.addUrlToList(url);
            helpers.serveAssets(res, './web/public/loading.html');
          }
        });

      });
    }
  }

  // res.end(archive.paths.list);
};
