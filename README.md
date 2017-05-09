![](https://i.imgur.com/1QyMN3G.png "logo by Vilhaum - https://github.com/vilhaum")

[![Black Hat Arsenal](https://www.toolswatch.org/badges/arsenal/2016.svg)](https://www.toolswatch.org/2016/06/the-black-hat-arsenal-usa-2016-remarkable-line-up/)

Overview (tl;dr)
=========

Brosec is a terminal based reference utility designed to help us infosec bros and broettes with useful (yet sometimes complex) payloads and commands that are often used during work as infosec practitioners. An example of one of Brosec's most popular use cases is the ability to generate on the fly reverse shells (python, perl, powershell, etc) that get copied to the clipboard.

Assuming the user has already set up the required variables (see the [Getting Started](https://github.com/gabemarshall/Brosec/wiki/Getting-Started) section of the wiki) a reverse shell using the awk command can be generated as easy as...

[![asciicast](https://asciinema.org/a/2okrjipq4zt8669rb9n54xneg.png)](https://asciinema.org/a/2okrjipq4zt8669rb9n54xneg)

Or maybe you need to remotely invoke a Powershell script? A download cradle can be generated like so.

[![asciicast](https://asciinema.org/a/c2793p8lzzvla8pqji29snyvc.png)](https://asciinema.org/a/c2793p8lzzvla8pqji29snyvc)


##### Additional Features and Usage Examples


###### [Bros http(s)](https://github.com/gabemarshall/Brosec/wiki/bros-http)
Need a quick web server? Forget python SimpleHTTPServer, bros has your back with `bros http` when entered via the command line. An SSL server? `bros https` has you covered.

![](http://i.imgur.com/47BHim4.gif)

<br>
###### [Bros FTP](https://github.com/gabemarshall/Brosec/wiki/bros-ftp)
Need to exfiltrate some data via ftp? Bros comes with a handy `bros ftp` when entered via the command line. The ftp server accepts anonymous downloads/uploads from the CWD (so be careful when running).


###### [Bros Encode](https://github.com/gabemarshall/Brosec/wiki/bros-encode)

A encoder/decoder utility designed with penetration testers in mind that often find the need to encode and decode various payloads.

![](https://i.imgur.com/EgTMG88.png)

![](http://i.imgur.com/wxFpA7o.png)


Learn about these features and more on the [Brosec wiki](https://github.com/gabemarshall/Brosec/wiki).




Installation
============

The preferred method of installation (in order to get all of the latest updates) is to clone the source and install the dependencies manualy (git clone && npm install).

However, a stable build can be quickly installed via the following instructions.

### Mac

#### Quick Installation

- `brew install node` - Install Nodejs (or download installer from https://nodejs.org/en/download/)
- `npm install -g Brosec` - Install Brosec (may need sudo to symlink to /usr/local/bin)


#### Kali Linux

- `apt-get install npm build-essential g++ xsel` Install dependencies
- `npm install -g n` Install n (nodejs version manager)
  - If the above fails, try - `npm config set registry http://registry.npmjs.org/`


- `n latest` Install latest version of nodejs
- `npm install -g Brosec` - Install Brosec (may need sudo to symlink to /usr/local/bin)

### Windows

- Install [nodejs](https://nodejs.org/download) via official installer
- `npm install -g Brosec` - Install Brosec

#### If you have trouble installing, you can also try a compiled copy of Brosec. See [Releases](https://github.com/gabemarshall/Brosec/releases).

Swag
====

<a name="sticker">Want a free Brosec sticker?</a>
<br><br> Submit a pull request, create an issue, or just send feedback to <gabemarshall@me.com> and I'll happily send you a sticker (supplies limited, free shipping to continental US only).

Otherwise you can order one from [StickerMule](https://www.stickermule.com/marketplace/10877-brosec-security-for-bros)


Credits
======

Brosec was heavily inspired by the Red Team Field Manual by Ben Clark. In addition, many payloads were referenced from other resources and deserve a shoutout.

- [pentestmonkey reverse shells](http://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet)
- [g0tmi1k linux privesc](https://blog.g0tmi1k.com/2011/08/basic-linux-privilege-escalation/)
- [obsecuresecurity](http://obscuresecurity.blogspot.com/2014/05/dirty-powershell-webserver.html)
- [SecLists](https://github.com/danielmiessler/SecLists)

Special thanks to [@LuxCupitor](https://twitter.com/LuxCupitor)
