var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(this.paths.list, function(err, data) {
    if(err) {
      throw err;
    } else {
      callback(data);
    }
  });
};

exports.isUrlInList = function(url, callback){
  this.readListOfUrls(function(sites){
    console.log(url);
    console.log(sites.toString());
    callback(sites.toString().match(url) !== null);
  });
};

exports.addUrlToList = function(url){
  // check if url already exist in list
  var context = this;
  this.isUrlInList(url, function(doesExist){
    if(!doesExist){
      fs.appendFile(context.paths.list, url, function(err){
        if(err) {
          throw err;
        }
        console.log('ARCHIVE: Added URL to site.txt')
      })
    }
  });

};

exports.isURLArchived = function(url, callback){
  // check if site exists under archives/sites folder
  fs.readFile(this.paths.archivedSites + '/' + url, function(err) {
    // check if error *does not* exist, which means that it is archived
    callback(!err);
  });

};


exports.downloadUrl = function(url){

  var context = this;
  http.get(url, function (err, res) {
    if (err) {
      throw (err);
    }
    // console.log(res.code, res.headers, res.buffer.toString());
    fs.writeFile(context.paths.archivedSites + '/' + url, res.buffer.toString(), function (err) {
      if (err) throw err;
      console.log('ARCHIVE: Downloaded missing archives from site.txt');
    });
  });

};



