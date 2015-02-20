
var assert = require('assert');
var pillow = require('./teddybear.js');

var curr = Date.now();
pillow(500);
var time = Date.now() - curr;

assert(time > 490 && time < 510);

var esc = String.fromCharCode(27);
var reset = esc + "[0m";
var green = esc + "[32m";

console.log('slept for ' + time + 'ms');
console.log();
console.log(green + 'ALL OK √' + reset);
