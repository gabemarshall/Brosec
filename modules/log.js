var color = require('cli-color');
var whiteOnBlack = color.bgXterm(236);
var keyArray = [];

color.status = function(msg){
    return whiteOnBlack(msg);
};

module.exports = color;
