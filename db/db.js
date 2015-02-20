var dirty = require('dirty');

// By default, brosec stores its data file in /var/tmp

var db = dirty('/var/tmp/bros.db');
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

