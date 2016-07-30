var prompt = require('prompt'),
		ask = require('../modules/questionUser');

// Initialize array and Payload Helper
arrayInfo = []

var Load = function(obj){
	arrayInfo.push(obj)
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


// ############### DNS ######################

Load({
	title: "Retrieve DNS server(s) of a domain",
	payload: 'host -t ns <RHOST (domain)> | cut -d " " -f4',
	category: "DNS"
})

Load({
	title: "Reverse DNS Lookup of an IP Address",
	payload: "dig +short -x <RHOST (ip address)>",
	category: "DNS"
})

Load({
	title: "DNS Zone XFER",
	payload: "dig @<RHOST (dns server)> <PROMPT (domain)> -t AXFR",
	category: "DNS",
	callback: function(returnToPrepare, lhost, lport, rhost, rport, user){
		prompt.message = "What domain would you like to use? :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})

	}

})

Load({
	title: "DNS Zone XFER",
	payload: "host -t axfr <PROMPT (domain)> <RHOST (dns server)>",
	category: "DNS",
	callback: function(returnToPrepare, lhost, lport, rhost, rport, user){
		prompt.message = "What domain would you like to use? :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})

	}

})


//host -t axfr domain.name dns-server


// ############### Port Scanning Payloads ######################

Load({
	title: "Nmap Verbose Version Scan",
	payload: "nmap -v -sS -sV --version-all -A <RHOST>",
	category: "Port Scanning"
})

Load({
	title: "Netcat Port Scan",
	payload: "nc -v -z -w2 <RHOST> 1-65535",
	category: "Port Scanning"
})

Load({
	title: "Send TCP SYN packets every 5 seconds to a specific port",
	payload: "hping <RHOST (hostname)> -S -V -p <PROMPT (port)> -i 5",
	category: "Port Scanning",
	callback: function(bro){
		question("What port would you like to check?");
		ask.some(questions, bro);
	}
})


// ############### SMB ######################

Load({
	title: "smbclient basic usage",
	payload: "smbclient -U <USER> \\\\\\\\<RHOST>\\\\<PROMPT (file share)>",
	category: "SMB",
	callback: function(returnToPrepare){
		prompt.message = "What network share would you like to connect to? :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})
	}
})

Load({
	title: "nbtscan basic usage",
	payload: "nbtscan -r <RHOST (network range)>",
	category: "SMB"
})

Load({
	title: "enum4linux basic usage",
	payload: "enum4linux -a <RHOST (hostname)>",
	category: "SMB"
})

Load({
	title: "SMB user enum nmap script",
	payload: "nmap -sS -sU --script smb-enum-users -p U:127,T:139,445 <RHOST (hostname)>",
	category: "SMB"
})

Load({
	title: "SMB os discovery nmap script",
	payload: "nmap -v -p 139, 445 --script=smb-os-discovery <RHOST hostname>",
	category: "SMB"
})

Load({
	title: "Netbios server vulnerability check",
	payload: "nmap --script-args=unsafe=1 --script smb-check-vulns.nse -p 445 <RHOST (hostname)>",
	category: "SMB"
})

// ############### SNMP ######################

Load({
	title: "SNMP Enumeration using Nmap and a list of community strings",
	payload: "nmap -sU --open -p 161 <RHOST (hostname)> <PROMPT (file path)>",
	category: "SNMP",
	callback: function(returnToPrepare){
		prompt.message = "Path to file :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})
	}
})

Load({
	title: "Enumerating the entire MIB Tree w/ snmpwalk",
	payload: "snmpwalk -c <PROMPT (community string)> -v1 <RHOST>",
	category: "SNMP",
	callback: function(returnToPrepare){
		prompt.message = "Community string :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})
	}
})

Load({
	title: "Enumerating Windows Users w/ snmpwalk",
	payload: "snmpwalk -c <PROMPT (community string)> -v1 <RHOST> 1.3.6.1.4.1.77.1.2.25",
	category: "SNMP",
	callback: function(returnToPrepare){
		prompt.message = "Community string :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})
	}
})

Load({
	title: "Enumerating Windows Processes w/ snmpwalk",
	payload: "snmpwalk -c <PROMPT (community string)> -v1 <RHOST> 1.3.6.1.2.1.25.4.2.1.2",
	category: "SNMP",
	callback: function(returnToPrepare){
		prompt.message = "Community string :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})
	}
})

Load({
	title: "Enumerating Open TCP Ports w/ snmpwalk",
	payload: "snmpwalk -c <PROMPT (community string)> -v1 <RHOST> 1.3.6.1.2.1.6.13.1.3",
	category: "SNMP",
	callback: function(returnToPrepare){
		prompt.message = "Community string :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})
	}
})

Load({
	title: "Enumerating Installed Software w/ snmpwalk",
	payload: "snmpwalk -c <PROMPT (community string)> -v1 <RHOST hostname or ip> 1.3.6.1.2.1.25.6.3.1.2",
	category: "SNMP",
	callback: function(returnToPrepare){
		prompt.message = "Community string :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})
	}
})

/*
######################################################
############### End of Payloads ######################
######################################################
*/


module.exports = arrayInfo;
