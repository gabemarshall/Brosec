var prompt = require('prompt');
var log = require('cli-color');
var options = log.yellow
var yellow = log.yellow
var blue = log.blue
var black = log.blackBright
var green = log.green
var red = log.red
var M = require('mstring')


// Payload Array
arrayWin = []

// Load payload function
var Load = function(obj){
	arrayWin.push(obj)
}

// title, description, payload, category, and callback (optional: used for additional options if needed)

// ############### System Info ######################

Load({ payload: "ver", desc: "Get OS version", category: "System Info"})
Load({ payload: "echo %USERNAME%", desc: "Get current user", category: "System Info"})
Load({ payload: "sc query state=all", desc: "Show services", category: "System Info"})
Load({ payload: "tasklist /svc", desc: "Show processes & services", category: "System Info"})
Load({ payload: "tasklist /m", desc: "Show processes & DLLs", category: "System Info"})

Load({
	payload: "taskkill /PID $$PROMPT$$ /F",
	sample: "taskkill /PID "+blue("<pid>")+green(" /F"),
	desc: "Force process to terminate",
	category: "System Info",
	callback: function(returnToPrepare, lhost, lport, rhost, rport, user){
		prompt.message = "What PID would you like to terminate? :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})	

	}
})

Load({
	payload: "reg query HKLM /f $$PROMPT$$ /t REG_SZ /s",
	sample: "reg query HKLM /f "+blue("<search term>")+green(" /t REG_SZ /s"),
	desc: "Search registry for value",
	category: "System Info",
	callback: function(returnToPrepare, lhost, lport, rhost, rport, user){
		prompt.message = "What term would you like to search for? :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})	

	}
})


// Windows Files pg 15
Load({
	title: "Windows Common Files",
	payload: "Windows Common Files",
	sample: "A quick look at common windows files",
	category: "File System",
	callback: function(returnToPrepare){
		var m = M(function(){
		/***
		
		%SYSTEMROOT%								Usually C:\Windows
		%SYSTEMROOT%\System32\drivers\etc\hosts					DNS entries
		%SYSTEMROOT%\System32\drivers\etc\networks				Network settings
		%SYSTEMROOT%\System32\config\SAM 					Password hashes
		%SYSTEMROOT%\repair\SAM 						Backup copy of SAM file
		%SYSTEMROOT%\System32\config\RegBack\SAM 				Backup copy of SAM file
		%SYSTEMROOT%\System32\config\AppEvent.Evt   				Application Log
		%SYSTEMROOT%\System32\config\SecEvent.Evt 				Security Log
		%USER%\Start Menu\Programs\Startup 					Startup Location
		%SYSTEMROOT%\Prefetch 							EXE logs

		***/})
		
		console.log(m)
		prompt.message = "Press enter to continue"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(1)	
		})	

	}
})



var unique = []
var uniqueCategories = []

module.exports = {
	values: arrayWin,
	getAll: function(value){
		tempArray = []
		for(i=0;i<arrayWin.length;i++){
			if (arrayWin[i].category === value){
				tempArray.push(arrayWin[i])
			}
		}
		return tempArray
	},
	getCategories: function(){
		for (i=0;i<arrayWin.length;i++){
			if(unique[arrayWin[i].category]){

			}
			else {
				unique[arrayWin[i].category] = true;
				uniqueCategories.push(arrayWin[i].category)
			} 
		return uniqueCategories
		}
	}
}