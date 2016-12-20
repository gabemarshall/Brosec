var prompt = require('prompt'),
	ask = require('../modules/questionUser')

// Payload Array
arrayAux = []

var Load = function(obj){
	arrayAux.push(obj)
}

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


---[Variable Formatting]---

* If variables aren't added properly, they will not work
* Variables can include instructions if needed.
* Instructions should be kept in parenthesis

	ex: foobar <RHOST> <LHOST> <LPORT>
	ex: foobar <RHOST (hostname)> <RPORT>


*/

// ############### Brosec Simple HTTP(s) Server ######################

Load({ payload: "bros http", desc: "Start a simple http server on port 8000", category: "Brosec Simple HTTP(s) Server"})

Load({
	desc: "Start a simple http server on a custom port",
	payload:'bros http <LPORT>',
	category: "Brosec Simple HTTP(s) Server",
})

Load({ payload: "bros https", desc: "Start a simple https server on port 8443 (default)", category: "Brosec Simple HTTP(s) Server"})

Load({
	desc: "Start a simple https server with a custom key/cert",
	payload:'bros https --cert=<PROMPT> --key=<PROMPT>',
	category: "Brosec Simple HTTP(s) Server",
	callback: function(bro){
		question("Enter the path to your certificate");
		question("Enter the path to your key");
		ask.some(questions, bro);
	}
})
Load({ 
	payload: "bros http --username=<PROMPT> --password=<PROMPT>", 
	desc: "Start a simple http server with basic auth enabled", 
	category: "Brosec Simple HTTP(s) Server",
	callback: function(bro){
		question("What username would you like to use?");
		question("Which password would you like to use?");
		ask.some(questions, bro);
	}
})
Load({ payload: "bros http --upload", desc: "Start a simple http server with file uploads enabled at /upload", category: "Brosec Simple HTTP(s) Server"})

// ############### Brosec Simple FTP Server ######################
Load({ payload: "bros ftp", desc: "Start a simple (anonymous) ftp server on port 2121 (default)", category: "Brosec Simple FTP Server"})
Load({ payload: "bros ftp <LPORT>", desc: "Start a simple (anonymous) ftp server on a custom port", category: "Brosec Simple FTP Server"})

Load({ 
	payload: "bros ftp --username=<PROMPT> --password=<PROMPT>", 
	desc: "Start a simple ftp server with anonymous access disabled", 
	category: "Brosec Simple FTP Server",
	callback: function(bro){
		question("What username would you like to use?");
		question("Which password would you like to use?");
		ask.some(questions, bro);
	}
})

// ################### Brosec Encoder Module ###################

Load({ payload: "bros encode", desc: "Start Brosec Encoder in interactive mode", category: "Brosec Encoder Module"})
Load({ 
	payload: "bros encode '<PROMPT>'", 
	desc: "Start Brosec Encoder in interactive mode with a preloaded string", 
	category: "Brosec Encoder Module",
	callback: function(bro){
		question("Enter input to pass to bros encode");
		ask.some(questions, bro);
	}
})

Load({ 
	payload: "bros encode '<PROMPT>' url", 
	desc: "Use Brosec Encoder from the command line, url encoding once", 
	category: "Brosec Encoder Module",
	callback: function(bro){
		question("Enter input to pass to bros encode");
		ask.some(questions, bro);
	}
})

Load({ 
	payload: "bros enc '<PROMPT>' u2", 
	desc: "Use Brosec Encoder from the command line, url encoding twice", 
	category: "Brosec Encoder Module",
	callback: function(bro){
		question("Enter input to pass to bros encode");
		ask.some(questions, bro);
	}
})


Load({ 
	payload: "bros dec '<PROMPT>' u2", 
	desc: "Use Brosec Encoder from the command line, url decoding twice", 
	category: "Brosec Encoder Module",
	callback: function(bro){
		question("Enter input to pass to bros encode");
		ask.some(questions, bro);
	}
})

Load({ 
	payload: "bros encode '<PROMPT>' html", 
	desc: "Use Brosec Encoder from the command line, html encoding once", 
	category: "Brosec Encoder Module",
	callback: function(bro){
		question("Enter input to pass to bros encode");
		ask.some(questions, bro);
	}
})

Load({ 
	payload: "bros encode '<PROMPT>' base64", 
	desc: "Use Brosec Encoder from the command line, base64 encoding once", 
	category: "Brosec Encoder Module",
	callback: function(bro){
		question("Enter input to pass to bros encode");
		ask.some(questions, bro);
	}
})

Load({ 
	payload: "bros encode '<PROMPT>' hex", 
	desc: "Use Brosec Encoder from the command line, encoding string to ascii hex", 
	category: "Brosec Encoder Module",
	callback: function(bro){
		question("Enter input to pass to bros encode");
		ask.some(questions, bro);
	}
})

Load({ 
	payload: "bros encode '<PROMPT>' md5", 
	desc: "Use Brosec Encoder from the command line, generating an md5 hash of input", 
	category: "Brosec Encoder Module",
	callback: function(bro){
		question("Enter input to pass to bros encode");
		ask.some(questions, bro);
	}
})

Load({ 
	payload: "bros encode '<PROMPT>' sha1", 
	desc: "Use Brosec Encoder from the command line, generating an sha1 hash of input", 
	category: "Brosec Encoder Module",
	callback: function(bro){
		question("Enter input to pass to bros encode");
		ask.some(questions, bro);
	}
})

Load({ 
	payload: "bros encode '<PROMPT>' sha256", 
	desc: "Use Brosec Encoder from the command line, generating an sha256 hash of input", 
	category: "Brosec Encoder Module",
	callback: function(bro){
		question("Enter input to pass to bros encode");
		ask.some(questions, bro);
	}
})

/*
######################################################
############### End of Payloads ######################
######################################################
*/

module.exports = arrayAux;
