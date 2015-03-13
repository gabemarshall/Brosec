#!/usr/bin/env node

var argv = require('yargs').argv;
var log = require('cli-color');
var db = require('./db/db');
var menu = require('./modules/menu');
var secondaryMenu = require("./modules/secondaryMenu");
var check = require('./modules/inputChecks')

var firstArgument = argv._[0];
var secondArgument = argv._[1];
var thirdArgument = argv._[2];


function getFirstArgValue(arg){
	switch (arg) {
		case 1:
			return secondaryMenu.infoGathering;
			break;
		case 2:
			return secondaryMenu.linux;
			break;
		case 3:
			return secondaryMenu.windows;
			break;
		case 4:
			return secondaryMenu.webAttacks;
		case 5:
			return secondaryMenu.misc;
	}
}

function parseArgs(){


	if (firstArgument >= 1 && firstArgument <= 6){
		secondaryMenu = getFirstArgValue(firstArgument);

		if (!secondArgument){
			secondaryMenu();
		}
		else if (!thirdArgument) {
			secondaryMenu(secondArgument);
		}
		else {
			secondaryMenu(secondArgument, thirdArgument);
		}
		
	}
	else if (firstArgument > 10){
		
		// If input is entered as "bros 111" split up the input and handle them individually
		var splitInput = firstArgument.toString(10).split("").map(function(t){return parseInt(t)})
		var inputLength = splitInput.length;

		secondaryMenu = getFirstArgValue(splitInput[0]);


		switch (inputLength){
			case 2:
				secondaryMenu(splitInput[1]);
				break;
			case 3:
				secondaryMenu(splitInput[1], splitInput[2])
		}
	}
	else if (typeof(firstArgument)==="string"){
		if (firstArgument.toUpperCase() != "CONFIG"){
			if (secondArgument && thirdArgument){
				check.allInputChecks(firstArgument+" "+secondArgument+" "+thirdArgument, console.log, menu.mainMenu)
			}
			else if (firstArgument.toUpperCase() === "HELP"){
				check.allInputChecks(firstArgument, menu.mainMenu, menu.mainMenu)
			}
			else {
				check.allInputChecks(firstArgument, console.log, console.log)
			}
			
		}
		else {
			console.log(log.yellow("\n[*] Sorry, that isn't valid input from the command line"))
			menu.mainMenu()
		}
		
	}
	else {
		menu.mainMenu();
	}
}

if (!firstArgument){
	menu.mainMenu();
}
else {
	parseArgs();
}

