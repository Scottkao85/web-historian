// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var archive = require('../helpers/archive-helpers.js');


// readListOfUrls -> //gives list of sites as data
archive.readListOfUrls(function(data){
  // iterate over data.split('\n'); split gives array of data
  _.each(data.split('\n'), function(url){
    // check if isURLArchived
    isUrlArchived(url, function(isArchived){
      // if is not, then downloadUrl and save
      if(!isArchived){
        archive.downloadUrl(url);
      }
    });
  });
});


