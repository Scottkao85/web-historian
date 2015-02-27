// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var archive = require('../helpers/archive-helpers.js');
var _ = require('underscore');


console.log("WORKER: Fetching new files to archive.");
// readListOfUrls -> //gives list of sites as data
archive.readListOfUrls(function(data){
  // iterate over data.split('\n'); split gives array of data

  // if(err) {console.log("WORKER ERROR: " + err + "\n")}
  var sites = data.toString().split('\n');
  console.log("WORKER: readListOfUrls - " + JSON.stringify(sites));

  _.each(sites, function(url){
    // check if isURLArchived
    if(url) {
      console.log("WORKER: url");

      archive.isURLArchived(url, function(isArchived){
        // if is not, then downloadUrl and save
        //
        console.log("WORKER: isArchived");

        if(!isArchived){

          console.log("WORKER: downloading " + url);

          archive.downloadUrl(url);
        }
      });
    }
  });
});
