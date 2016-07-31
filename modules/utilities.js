
var log = require('./log.js'),
    os = require('os');

exports.update = function(){
  console.log("This feature is no longer available. To update Brosec run "+log.status("npm update -g Brosec")+" or do a "+log.status("git pull")+" from the Brosec directory");
}

exports.encoder = function(input){
  var encoder = require('./encoder')
  encoder.init(input);
}

exports.isWindows = function(){
  var currentOS = os.type();
  var bool = false;
  if (currentOS.match("Windows")){
      bool = true;
  }
  return bool;
}
