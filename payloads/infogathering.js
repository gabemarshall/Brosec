var prompt = require('prompt');
var log = require('cli-color');
var options = log.yellow
var yellow = log.yellow
var blue = log.blue
var black = log.blackBright
var green = log.green
var red = log.red

// Payload Array
arrayInfo = []
var addPayload = arrayInfo.push

// title, description, payload, category, and callback (optional: used for additional options if needed)

// ############### DNS ######################

arrayInfo.push({
	title: "Retrieve DNS server(s) of a domain", 
	payload: 'host -t ns $$RHOST$$ | cut -d " " -f4',
	sample: 'host -t ns '+red('<RHOST>')+' | cut -d " " -f4',
	category: "DNS"
})

arrayInfo.push({
	title: "Reverse DNS Lookup of an IP Address", 
	payload: "dig +short -x $$RHOST$$",
	sample: "dig +short -x "+red("<RHOST>"),
	category: "DNS"
})

arrayInfo.push({
	title: "DNS Zone XFER",
	payload: "dig @$$RHOST$$ $$PROMPT$$ -t AXFR",
	sample: "dig @"+red("<RHOST (dns server)>")+blue(" <PROMPT (domain)>")+" -t AXFR",
	category: "DNS",
	callback: function(returnToPrepare, lhost, lport, rhost, rport, user){
		prompt.message = "What domain would you like to use? :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})	

	}

})


// ############### Port Scanning Payloads ######################

arrayInfo.push({
	title: "Nmap Verbose Version Scan", 
	payload: "nmap -v -sS -sV --version-all -A $$RHOST$$",
	sample: "nmap -v -sS -sV --version-all -A "+yellow("<hostname or ip>")+"",
	category: "Port Scanning"
})

arrayInfo.push({
	title: "Netcat Port Scan", 
	payload: "nc -v -z -w2 $$RHOST$$ 1-65535",
	sample: "nc -v -z -w2 "+yellow("<hostname or ip>")+" 1-65535",
	category: "Port Scanning"
})

arrayInfo.push({
	title: "Send TCP SYN packets every 5 seconds to a specific port", 
	payload: "hping $$RHOST$$ -S -V -p $$PROMPT$$ -i 5",
	sample: "hping "+yellow("<hostname or ip>")+" -S -V -p <port> -i 5",
	category: "Port Scanning",
	callback: function(returnToPrepare){
		prompt.message = "What port would you like to use? :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})
	}
})


// ############### SMB ######################

arrayInfo.push({
	title: "smbclient basic usage", 
	payload: "smbclient -U $$USER$$ ~~$$RHOST$$~$$PROMPT$$",
	sample: "smbclient -U "+black("<username>")+" \\\\"+yellow("<hostname or ip>")+"\\"+blue("<share>"),
	category: "SMB",
	callback: function(returnToPrepare){
		prompt.message = "What network share would you like to connect to? :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})
	}
})

arrayInfo.push({
	title: "nbtscan basic usage", 
	payload: "nbtscan -r $$PROMPT$$",
	sample: "nbtscan -r "+yellow("<ip range>"),
	category: "SMB",
	callback: function(returnToPrepare){
		prompt.message = "What network range would you like to scan? (Ex: 192.168.1.0/24) :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})
	}
})

arrayInfo.push({
	title: "enum4linux basic usage", 
	payload: "enum4linux -a $$RHOST$$",
	sample: "enum4linux -a "+yellow("<hostname or ip>"),
	category: "SMB"
})

arrayInfo.push({
	title: "SMB user enum nmap script", 
	payload: "nmap -sS -sU --script smb-enum-users -p U:127 T:139,445 $$RHOST$$",
	sample: "nmap -sS -sU --script smb-enum-users -p U:127 T:139,445 "+yellow("<hostname or ip>"),
	category: "SMB"
})

arrayInfo.push({
	title: "SMB os discovery nmap script", 
	payload: "nmap -v -p 139, 445 --script=smb-os-discovery $$RHOST$$",
	sample: "nmap -v -p 139, 445 --script=smb-os-discovery "+yellow("<hostname or ip>"),
	category: "SMB"
})

arrayInfo.push({
	title: "Netbios server vulnerability check", 
	payload: "nmap --script-args=unsafe=1 --script smb-check-vulns.nse -p 445 $$RHOST$$",
	sample: "nmap --script-args=unsafe=1 --script smb-check-vulns.nse -p 445 "+yellow("<hostname or ip>"),
	category: "SMB"
})

// ############### SNMP ######################

arrayInfo.push({
	title: "SNMP Enumeration using Nmap and a list of community strings", 
	payload: "nmap -sU --open -p 161 $$RHOST$$ $$PROMPT$$ ",
	sample: "nmap -sU --open -p 161 "+yellow("<hostname or ip>")+blue(" <file path>"),
	category: "SNMP",
	callback: function(returnToPrepare){
		prompt.message = "Path to file :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})
	}
})

arrayInfo.push({
	title: "Enumerating the entire MIB Tree w/ snmpwalk", 
	payload: "snmpwalk -c $$PROMPT$$ -v1 $$RHOST$$",
	sample: "snmpwalk -c "+blue("<community string>")+" -v1 "+yellow("<hostname or ip>"),
	category: "SNMP",
	callback: function(returnToPrepare){
		prompt.message = "Community string :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})
	}
})

arrayInfo.push({
	title: "Enumerating Windows Users w/ snmpwalk", 
	description: "- RHOST="+yellow("<hostname or ip>")+", PROMPT="+blue("<community string>"),
	sample: "snmpwalk -c "+blue("<community string>")+" -v1 "+yellow("<hostname or ip>")+" 1.3.6.1.4.1.77.1.2.25",
	category: "SNMP",
	callback: function(returnToPrepare){
		prompt.message = "Community string :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})
	}
})

arrayInfo.push({
	title: "Enumerating Windows Processes w/ snmpwalk", 
	payload: "snmpwalk -c $$PROMPT$$ -v1 $$RHOST$$ 1.3.6.1.2.1.25.4.2.1.2",
	sample: "snmpwalk -c "+blue("<community string>")+" -v1 "+yellow("<hostname or ip>")+" 1.3.6.1.2.1.25.4.2.1.2",
	category: "SNMP",
	callback: function(returnToPrepare){
		prompt.message = "Community string :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})
	}
})

arrayInfo.push({
	title: "Enumerating Open TCP Ports w/ snmpwalk", 
	payload: "snmpwalk -c $$PROMPT$$ -v1 $$RHOST$$ 1.3.6.1.2.1.6.13.1.3",
	sample: "snmpwalk -c "+blue("<community string>")+" -v1 "+yellow("<hostname or ip>")+" 1.3.6.1.2.1.6.13.1.3",
	category: "SNMP",
	callback: function(returnToPrepare){
		prompt.message = "Community string :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})
	}
})

arrayInfo.push({
	title: "Enumerating Installed Software w/ snmpwalk", 
	payload: "snmpwalk -c $$PROMPT$$ -v1 $$RHOST$$ 1.3.6.1.2.1.25.6.3.1.2",
	sample: "snmpwalk -c "+blue("<community string>")+" -v1 "+yellow("<hostname or ip>")+" 1.3.6.1.2.1.25.6.3.1.2",
	category: "SNMP",
	callback: function(returnToPrepare){
		prompt.message = "Community string :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})
	}
})

var unique = []
var uniqueCategories = []

module.exports = {
	values: arrayInfo,
	getAll: function(value){
		tempArray = []
		for(i=0;i<arrayInfo.length;i++){
			if (arrayInfo[i].category === value){
				tempArray.push(arrayInfo[i])
			}
		}
		return tempArray
	},
	getCategories: function(){
		for (i=0;i<arrayInfo.length;i++){
			if(unique[arrayInfo[i].category]){

			}
			else {
				unique[arrayInfo[i].category] = true;
				uniqueCategories.push(arrayInfo[i].category)
			} 
		return uniqueCategories
		}
	}
}
