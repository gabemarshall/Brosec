![](https://i.imgur.com/1QyMN3G.png "logo by Vilhaum - https://github.com/vilhaum")


Overview (tl;dr)
=========

Brosec is a terminal based reference utility designed to help us infosec bros and broettes with useful (yet sometimes complex) payloads and commands that are often used during work as infosec practitioners. An example of one of Brosec's most popular use cases is the ability to generate on the fly reverse shells (python, perl, powershell, etc) that get copied to the clipboard.

Assuming the user has already set up the required variables (read on to learn how) a reverse shell using the awk command can be generated as easy as...

[![asciicast](https://asciinema.org/a/2okrjipq4zt8669rb9n54xneg.png)](https://asciinema.org/a/2okrjipq4zt8669rb9n54xneg)

#### Payload Variables

Brosec allows you to store and retrieve values (in a local json db) for several variables in order to make command/payload generation easier. While some payloads will already include these variables, you can also include them in any payload that prompts for user input.

For example, the following shows how a Powershell download cradle can be generated using the LHOST and LPORT variables (the values of which had already been set).

[![asciicast](https://asciinema.org/a/c2793p8lzzvla8pqji29snyvc.png)](https://asciinema.org/a/c2793p8lzzvla8pqji29snyvc)

##### Available variables

- LHOST : Local IP or name
- LPORT : Local IP or name
- RHOST : Remote IP or name
- RPORT : Remote IP or name
- USER : Username (only used in a few payloads)
- PROMPT : User Prompt (This isn't a stored value. Instead, payloads with this variable will prompt for input.)

<br>

![](http://i.imgur.com/FCateZJ.gif)
<br>Above are multiple examples of how to access and set the stored configuration variables.
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
In addition to payloads such as reverse shells, Brosec also has multiple XXE payloads that you can generate on the fly.
<br><br>

###### Simple HTTP(s) Server
Need a quick web server? Forget python SimpleHTTPServer, bros has your back with `bros http` when entered via the command line. An SSL server? `bros https` has you covered.

![](http://i.imgur.com/47BHim4.gif)

<br>
###### Anonymous FTP Server
Need to exfiltrate some data via ftp? Bros comes with a handy `bros ftp` when entered via the command line. The ftp server accepts anonymous downloads/uploads from the CWD (so be careful when running).

Installation
============

### [Releases](https://github.com/gabemarshall/Brosec/releases)

*Some features are unavailable in the compiled version, but is a good way to quickly try out Brosec*

### Manual installation

#### Mac

- `brew install node netcat` - Install Nodejs and netcat (nc or ncat will work too)
- `git clone https://github.com/gabemarshall/Brosec.git` - Clone Brosec repo
- `cd Brosec && npm install` - cd into the directory and install npm depdendencies

#### Kali Linux

- `apt-get install npm build-essential g++ xsel netcat` Install dependencies
- `npm config set registry http://registry.npmjs.org/` Npm registry seems to be broken by default when installed from Kali repos
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


Swag
====

<a name="sticker">Want a free Brosec sticker?</a>
<br><br> Submit a pull request, create an issue, or just send feedback to <gabemarshall@me.com> and I'll happily send you a sticker (supplies limited, free shipping to continental US only).

Otherwise you can order one from [StickerMule](https://www.stickermule.com/marketplace/10877-brosec-security-for-bros)
