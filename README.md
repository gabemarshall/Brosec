Brosec
======
Security, for Bros.

Overview (TLDR)
=========

Brosec is a reference utility designed to help Security Bros with useful (but sometimes complex) payloads and commands that are often used pentest engagementments. Brosec's most useful feature is the ability to generate on the fly reverse shells (python, perl, powershell, etc) that get copied to the clipboard.

Assuming the user has already set up the required variables (read on to learn how) a python reverse shell can be generated as easy as...

http://showterm.io/100e367a74760534274e6

#### Payload Variables

Brosec stores and retrieves values of the following variables when used in payloads. While some payloads will already include these variables, you can also include them in any payload that prompts for user input.

For example, the following shows how a Powershell download cradle can be generated using multiple stored variables.

http://showterm.io/af3dc2dd245b69ec79b28

##### Available variables

- LHOST : Local IP or name
- LPORT : Local IP or name
- RHOST : Remote IP or name
- RPORT : Remote IP or name
- USER : Username (only used in a few payloads)
- PROMPT : User Prompt (This isn't a stored value. Instead, payloads with this variable will prompt for input.)

<br>

![](http://i.imgur.com/FCateZJ.gif)
Above are multiple examples of how to access and set the stored configuration variables.
- Configuration variables can be viewed via the `config` command at any time, or by entering the variable name
- Variables can be changed at any time by entering `set <variable> <value>`
- You can also navigate to frequently used payloads by entering the menu sequence from the command line: `bros <sequence>`
  - Ex: `bros 413` - This would automate entering 4 for the Web Menu, 1 for the XXE sub menu, and 3 for the XXE local file read payload

<br>

<br>
##### Additional Features and Usage Examples
###### XXE for Bros
![](http://i.imgur.com/hxrqlvk.gif)
<br>
In addition to useful payloads such as reverse shells, Brosec also has multiple XXE payloads that you can generate on the fly.
<br><br>

###### Simple HTTP(s) Server
Need a quick web server? Forget python SimpleHTTPServer, bros has your back with `bros http` when entered via the command line. An SSL server? `bros https` has you covered.

![](http://i.imgur.com/47BHim4.gif)

<br>
###### Anonymous FTP Server
Need to exfiltrate some data via ftp? Bros comes with a handy `bros ftp` when entered via the command line. The ftp server accepts anonymous downloads/uploads from the CWD (so be careful when running).

Installation
============

#### Mac

- `brew install node netcat` - Install Nodejs and netcat (nc or ncat will work too)
- `git clone https://github.com/gabemarshall/Brosec.git` - Clone Brosec repo
- `cd Brosec && npm install` - cd into the directory and install npm depdendencies

#### Linux

- `<package manager> install npm build-essential g++ xsel netcat` Install dependencies
- `npm install -g n` Install n (nodejs version manager)
- `n latest` Install latest version of nodejs
- `git clone https://github.com/gabemarshall/Brosec.git` - Clone Brosec repo
- `cd Brosec && npm install` - cd into the directory and install npm depdendencies

### Windows (Unsupported)

- Install [nodejs](https://nodejs.org/download)
- Install [ncat](https://nmap.org/download.html)
- `git clone https://github.com/gabemarshall/Brosec.git` - Clone Brosec repo

Payloads that utilize netcat will not work due to the kexec library not being supported in Windows


#### Optional
Add bros directory path to your PATH env variable, create a symlink for the bros file, etc

Configuration
=====================

Brosec stores configuration values in a local json db file. The default storage location is /var/tmp, but can be changed by editing settings.dbPath variable in the settings.js file. Brosec also uses netcat for several payloads. If needed, the path to netcat can be altered via the settings.netcat variable (it can also be changed to ncat or nc).
