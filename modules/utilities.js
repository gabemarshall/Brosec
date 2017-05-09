
var log = require('./log.js'),
    os = require('os'),
    crypto = require('crypto');

exports.update = function(){
  console.log("This feature is no longer available. To update Brosec run "+log.status("npm update -g Brosec")+" or do a "+log.status("git pull")+" from the Brosec directory");
}

exports.encoder = function(input){
  var encoder = require('./encoder')
  encoder.init(input);
}

exports.urlencode = function(input){
    var result = encodeURIComponent(input);
    result = result.replace(/(')/g, "%27");
    result = result.replace(/(\()/g, "%28");
    result = result.replace(/(\))/g, "%29");
    return result;
}

exports.base64Decode = function(input){
  if (typeof(input) != "string"){
    input = input.toString();
  }
  return new Buffer(input, 'base64').toString();
}

exports.base64Encode = function(input){
  if (typeof(input) != "string"){
    input = input.toString();
  }
  return new Buffer(input).toString('base64');
}

exports.md5 = function(input){
  return crypto.createHash('md5').update(input).digest("hex");
}

exports.sha1 = function(input){
  return crypto.createHash('sha1').update(input).digest("hex");
}

exports.sha256 = function(input){
  return crypto.createHash('sha256').update(input).digest("hex");
}

exports.ascii2hex = function(input){
  return new Buffer(input).toString('hex');
}
exports.hex2ascii = function(input){
  return new Buffer(input, 'hex').toString('ascii')
}


exports.isWindows = function(){
  var currentOS = os.type();
  var bool = false;
  if (currentOS.match("Windows")){
      bool = true;
  }
  return bool;
}
