var prompt = require('prompt');
var log = require('cli-color');
var options = log.yellow
var yellow = log.yellow
var blue = log.cyan
var black = log.blackBright
var green = log.green
var red = log.red
var M = require('mstring')

// Payload Array
arrayLinux = []

// Load payload function
var Load = function(obj){
	arrayLinux.push(obj)
}

// title, description, payload, category, and callback (optional: used for additional options if needed)

// ############### System Info ######################

Load({
	payload: "nbtstat -A $$RHOST$$",
	sample: "nbtstat -A "+yellow("<ip address>")+"        ",
	desc: "Get hostname for <ip address>",
	category: "System Info"
})

Load({
	payload: "id",
	desc: "Get current username",
	category: "System Info"
})

Load({
	payload: "w",
	desc: "Logged on users",
	category: "System Info"
})

Load({
	payload: "who -a",
	desc: "Basic info about current users",
	category: "System Info"
})

Load({ payload: "last -a", desc: "Basic info about current users", category: "System Info"})
Load({ payload: "ps -ef", desc: "Process listing", category: "System Info"})
Load({ payload: "df -h", desc: "Disk usage (free)", category: "System Info"})

Load({ payload: "uname -a", desc: "Kernel version/CPU", category: "System Info"})
Load({ payload: "cat /etc/issue", desc: "Show OS Info", category: "System Info"})
Load({ payload: "cat /etc/*release*", desc: "Show OS version info", category: "System Info"})
Load({ payload: "cat /proc/version", desc: "Show kernel info", category: "System Info"})

Load({ payload: "rpm --query -all", desc: "Show installed packages (Redhat)", category: "System Info"})
Load({ payload: "rpm -vih *.rpm", desc: "Install RPM package (-e remove)", category: "System Info"})
Load({ payload: "dpkg -get-selections", desc: "Show installed packages (Ubuntu)", category: "System Info"})
Load({ payload: "dpkg -I *.deb", desc: "Install DEB package (-r remove)", category: "System Info"})


Load({ payload: "ps -ef", desc: "Process listing", category: "System Info"})


// ############### File System  ######################

// Linux File Commands pg 6
Load({ payload: "diff file1 file2", desc: "Compare two files", category: "File System"})
Load({ payload: "strings -n 5", desc: "Set minimum string length", category: "File System"})
Load({ payload: "ps -ef", desc: "Process listing", category: "File System"})

// Linux File System Structure pg 7
Load({
	title: "Linux File System Overview",
	payload: "Linux File System Overview",
	sample: "A quick look at common linux directories",
	category: "File System",
	callback: function(returnToPrepare){
		var m = M(function(){
		/***

		/bin 		User binaries
		/boot		Boot related files
		/dev		System devices
		/etc		System config files
		/home 		Home directory for each user
		/lib 		Important software libraries
		/opt 		Third party software
		/proc 		System and other running programs
		/root		Directory of the user "root"
		/sbin		Sys admin binaries
		/tmp 		Temporary files
		/usr 		Shareable read-only data
		/var 		Contains variable data (ie: logging files)

		***/})
		
		console.log(m)
		prompt.message = "Press enter to continue"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(1)	
		})	

	}
})

Load({
	title: "Config locations",
	payload: "Config locations",
	sample: "Common locations for config files",
	category: "File System",
	callback: function(returnToPrepare){
		var m = M(function(){
		/***

		/etc/issue 	
		/etc/master.passwd
		/etc/crontab
		/etc/sysctl.conf
		/etc/resolv.conf
		/etc/syslog.conf
		/etc/chttp.conf
		/etc/lighttpd.conf
		/etc/cups/cupsd.confcda
		/etc/inetd.conf
		/opt/lampp/etc/httpd.conf
		/etc/samba/smb.conf
		/etc/openldap/ldap.conf
		/etc/ldap/ldap.conf
		/etc/exports
		/etc/auto.master
		/etc/auto_master
		/etc/fstab

		***/})
		
		console.log(m)
		prompt.message = "Press enter to continue"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(1)	
		})	

	}
})


// ############### Networking  ######################
// Add ssh port forwarding?
// Linux Network Commands pg 5
Load({ payload: "watch ss -tp", desc: "Network connections", category: "Networking"})
Load({ payload: "netstat -tulpn", desc: "Connections with PIDs", category: "Networking"})
Load({ payload: "lsof -i TCP -n -P | grep LISTEN", desc: "Connections with PIDs", category: "Networking"})
Load({ payload: "route -n", desc: "Find the ip of your gateway", category: "Networking"})
Load({ payload: "route -n get default", desc: "Find the ip of your gateway (MacOS)", category: "Networking"})

Load({
	payload: "smb://$$RHOST$$/$$PROMPT$$",
	sample: "smb://"+yellow("<ip address>/")+blue("share"),
	desc: "Mount Windows share",
	category: "Networking",
	callback: function(returnToPrepare, lhost, lport, rhost, rport, user){
		prompt.message = "What share would you like to mount? :"
		prompt.get([{name: '_', description: ':'}], function(err, result){
			returnToPrepare(result._)
		})	

	}
})


// ############### Stealth  ######################

Load({ payload: "echo \"\" > /var/log/auth.log", desc: "Clear auth.log", category: "Stealth"})
Load({ payload: "history -c", desc: "Clear bash history", category: "Stealth"})
Load({ payload: "touch ~/.bash_history", desc: "Clear bash history", category: "Stealth"})
Load({ payload: "rm -rf ~/.bash_history && ln -s ~/.bash_history /dev/null", desc:"Permanently remove bash history", category:"Stealth"})


var unique = []
var uniqueCategories = []

module.exports = {
	values: arrayLinux,
	getAll: function(value){
		tempArray = []
		for(i=0;i<arrayLinux.length;i++){
			if (arrayLinux[i].category === value){
				tempArray.push(arrayLinux[i])
			}
		}
		return tempArray
	},
	getCategories: function(){
		for (i=0;i<arrayLinux.length;i++){
			if(unique[arrayLinux[i].category]){

			}
			else {
				unique[arrayLinux[i].category] = true;
				uniqueCategories.push(arrayLinux[i].category)
			} 
		return uniqueCategories
		}
	}
}
