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

function argExactSearch(value){
	if (value.match(/scan|port|nmap|hping|cat/ig)){
		secondaryMenu.infoGathering("Port Scanning")
		return true
	}
	else {
		return false
	}
}

function getSecondArgDefinition(value){
	if (value.match(/scan|port|nmap|hping|netcat/ig)){
		return "Port Scanning"
	}
}

function parseArgs(){


	if (firstArgument === "INFOG" || firstArgument === "IG" || firstArgument === "1"){
		
		if (!secondArgument){
			secondaryMenu.infoGathering()
		}
		else {
			secondaryMenu.infoGathering(getSecondArgDefinition(secondArgument))
		}
		
	}
	else {
		var userIsSearching = argExactSearch(firstArgument)
		if (userIsSearching){
			// User is searching for a specfic section from the command line. "Ex: bros nmap" 
			// should load the nmap payloads
		}
		else {
			menu.mainMenu()
		}
		
	}
}

if (!firstArgument){
	menu.mainMenu()
}
else {
	parseArgs()
}

