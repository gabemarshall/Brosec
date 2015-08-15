var color = require('cli-color');
module.exports = {
  status: function(msg) {
    return console.log(color.blackBright(msg));
  },
  warn: function(msg) {
    return console.log(color.red(msg));
  }
}
