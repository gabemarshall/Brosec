
var log = require('./log.js'),
  	encoder = require('./encoder')

exports.update = function(){
  console.log("This feature is no longer available. To update Brosec run "+log.status("npm update -g Brosec")+" or do a "+log.status("git pull")+" from the Brosec directory");
}

exports.encoder = function(input){
  encoder.init(input);
}
