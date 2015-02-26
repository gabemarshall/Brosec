#!/usr/bin/env node

var argv = require('yargs').argv;
var log = require('cli-color');
var db = require('./db/db');
var menu = require('./modules/menu');
var secondaryMenu = require("./modules/secondaryMenu")

var firstArgument = argv._[0];
var secondArgument = argv._[1];
var thirdArgument = argv._[2];

try {
	firstArgument = firstArgument.toUpperCase();
	secondArgument = secondArgument.toUpperCase();
	thirdArgument = thirdArgument.toUpperCase();
}
catch (err){

}


function parseArgs(){
	if (firstArgument === "infog"){
		if (!secondArgument){
			console.log(1)
			secondaryMenu.infoGathering()
		}
		else {
			secondaryMenu.infoGathering(secondArgument)
		}
		
	}
}

if (!firstArgument){
	menu.mainMenu()
}
else {
	parseArgs()
}

