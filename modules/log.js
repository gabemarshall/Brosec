var color = require('cli-color');
var whiteOnBlack = color.bgXterm(236);
var keyArray = [];

module.exports = {
  status: function(msg) {
    return console.log(whiteOnBlack(msg));
  },
  warn: function(msg) {
    return console.log(color.red(msg));
  },
  yellow: function(msg) {
    return color.yellow(msg);
  }
}
