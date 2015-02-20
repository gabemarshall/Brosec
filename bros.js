#!/usr/bin/env node

var argv = require('yargs').argv;
var log = require('cli-color');
var db = require('./db/db');
var menu = require('./modules/menu');

var firstArgument

firstArgument = argv._[0];
secondArgument = argv._[1];

if (!firstArgument){
	menu.mainMenu()
}
else if (firstArgument === "new" && secondArgument){
	db.new(secondArgument, "None")
}
else if (firstArgument === "set"){
	db.newConfig(argv._[1], argv._[2])
}

