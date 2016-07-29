var dirty = require('dirty');
var settings = require('../modules/settings.js');
var os = require('os');
// By default, brosec stores its data file in /var/tmp
// Change storage location by altering settings.js
try {
  var db = dirty(settings.dbPath);
}
catch (err){
  console.log("There was a problem initializing the bros. Check the settings.js file to specify a valid storage location.")
}

var output = require('../modules/output')

exports.new = function(title, description){
  db.on('load', function() {
    db.set(title, {description: description});
  });
}

exports.newConfig = function(key, val){
  var keyExists = false
    db.forEach(function(keyStore, valStore) {
      if (key === keyStore){
        keyExists = true
        return
      }
    });
    if (keyExists){
      db.rm(key, function(){
        db.set(key, val)
      });
    }
    else {
      db.set(key, val)
    }
  db.on('drain', function() {
  });
}

function getConfig(value){
  var test
  var foundKey = false
    db.forEach(function(key, val) {
      // Output sub categories
      if (foundKey){
        return
      }
      if (key === value){
        test = val
        foundKey = true
      }
      // If none exist
      else {

      }
    });
    return test
}

exports.getConfig = getConfig;
