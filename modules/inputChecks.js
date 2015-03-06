var menu = require('./menu');
var db = require('../db/db');
var log = require('cli-color');

var ifUserNeedsHelp = function(input, currentMenu, previousMenu){
	if (input.match(/(help)/ig)){
		menu.helpMenu(currentMenu)
		return true
	
	}
	else {
		return false
	}
}

var ifUserWantsBack = function(input, currentMenu, previousMenu){
	if (input.match(/(back)/ig)){
		
		previousMenu()
		return true
	}
	else {
		return false
	}
}

var ifUserWantsHome = function(input, currentMenu, previousMenu){
	if (input.match(/(home|main)/ig)){
		menu.mainMenu(menu.clearMenu())
	}
}

var ifUserAccessConfig = function(input, currentMenu, previousMenu){
	if (input.match(/(set)/ig)){
		menu.parseConfigPrompt(input, false)

		// Ugly hacks ftw!
		
		//setTimeout(function(){menu.printConfig(currentMenu)}, 25)
		setTimeout(function(){currentMenu()}, 25)
		return true
		
	}
	else {
		return false
	}
}

var ifUserWantsConfig = function(input, currentMenu, previousMenu){
	
	
	if (input.match(/(config|options)/ig)){
		menu.printConfig(currentMenu)
		return true
		
	}

	else if (input.match(/(RPORT|RHOST|LPORT|LHOST|USER)/i)){
		
		currentMenu()
		var thisConfigValue = input.toUpperCase()
		console.log(log.green(thisConfigValue)+" => "+log.blackBright(db.getConfig(thisConfigValue))+"\n\n")
		
	}
}

var ifUserWantsToExit = function(input, currentMenu, previousMenu){
	if (input.match(/(exit|quit)/ig)){
		console.log("Quitting!")
		process.exit({clean:false})
	}
}

var ifUserSaysConfigItem = function(input, currentMenu, previousMenu){
	var input = input.toUpperCase()

	if (input.match(/(set LPORT|set LHOST|set RHOST|set RPORT|set USER)/) && input.length < 7){
		console.log("\n\n\n")
		console.log(log.green(input)+" => "+log.blackBright(db.getConfig(input))+"\n\n")
		currentMenu()
	}
}


exports.ifUserNeedsHelp = ifUserNeedsHelp
exports.ifUserWantsBack = ifUserWantsBack
exports.ifUserAccessConfig = ifUserAccessConfig
exports.ifUserWantsToExit = ifUserWantsToExit
exports.ifUserWantsHome = ifUserWantsHome
exports.ifUserSaysConfigItem = ifUserSaysConfigItem

exports.allInputChecks = function(input, currentMenu, previousMenu){

	var inputMatchedCheck = false

	var inputChecks = [ifUserNeedsHelp,ifUserWantsBack,ifUserAccessConfig,ifUserWantsConfig,ifUserWantsToExit,ifUserWantsHome,ifUserSaysConfigItem]
	for (i=0;i<inputChecks.length;i++){
		if(inputChecks[i](input, currentMenu, previousMenu)){
			inputMatchedCheck = true
		}
	}
	return inputMatchedCheck
}