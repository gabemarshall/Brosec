# ChangeLog

## 1.3.0.2 _(Jan 23, 2016)_

- Enhancement
  - Added a length counter to interactive bros encode module

- Bug Fixes
  - The XXE using parameterized entities wasn't working correctly. Should be fixed now.

## 1.3.0.1 _(Dec 28, 2016)_

- Bug Fixes
  - Fixed a typo that caused bros encode asciihex to not work

## 1.3.0 _(Dec , 2016)_

- Enhancement
  - Added a new section (```bros 6```) for Brosec auxiliary modules (bros http, ftp, encode)
  - Added a command line interface for bros encode
  - Added MSF Venom one liners to a sub-section under ```bros 5```

- Bug Fixes
  - Fixed an issue in bros encoder (long strings were getting chopped) 

## 1.2.3 _(October 27, 2016)_

- Bug Fixes
  A dependency issue was discovered in ftpd when running Brosec with nodejs v7.0. A temporary fix has been put in place.

## 1.2.2 _(October 18, 2016)_
- Enhancement
  - Some minor changes to the ```bros encode`` module. The input field can be opened in the default text editor (Mac/Linux only) via C-e. In order to implement this, the other keyboard shortcuts had to be changed.

## 1.2.1 _(September 10, 2016)_

- Enhancement
  - bros http uploader is disabled by default. It is now enabled via the --upload option. Ex: ```bros http --upload```

## 1.2.0 _(August 11, 2016)_
- Features
  - bros http
    - Added a simple file upload at /upload
    - Added a basic auth support via ```bros http(s) --username=foo --password=bar
- Bug Fixes
  - Several minor bug fixes

## 1.1.6 _(August 8, 2016)_
- Features
  - Encoder
    - Added md5, sha1, sha256 hashing methods
- Payloads
  - Added ```Add user to remote desktop group``` to ```bros 31``` category
  - Added prompts to several bros 31 (Windows System Info) payloads.
- Bug Fixes!
  - Fixed an issue that would cause Brosec to prematurely exit when a payload with a menu option value greater than 9 was requested from the command line. For example, the <code>bros 3</code>  > <code>1</code> > <code>11</code>  payload (Windows payload to search the registry for a specific value) would exit prematurely if <code>bros 3111</code> was entered from the command line.
  - Minor fixes to a few Windows payloads that were using a deprecated Brosec syntax

## 1.1.5 _(August 4, 2016)_
- Features
  - Brosec variable values will be copied to the clipboard when retrieved. For example, running ```bros lhost``` from the command line will retrieve the LHOST variable, and copy it to your clipboard.
- Bug fixes!
- Improved error handling
- Cleaned up output
  - Removed the ```Output copied to clipboard!``` message to reduce clutter.

## Major Release 1.1.1 _(July 30, 2016)_

- Features
  - <strong>Full Windows Support added</strong>
  - Better documentation added to the new  [wiki](https://github.com/gabemarshall/Brosec/wiki)
  - Simplified install process. Once you have nodejs installed just run ```npm install -g Brosec```
  - ```bros encode``` module added (realtime encoder/decoder)
  - ```bros ftp``` now supports auth via ```--username``` and ```--password``` parameters.
  - New SQLi Polyglots added to ```bros 43```
  - New XSS payloads ```bros 42```
    - (```bros 424``` Credit to [@0xsobky](https://github.com/0xsobky/HackVault/wiki/Unleashing-an-Ultimate-XSS-Polyglot))
- Dependencies
  - Removed kexec dependency that was used to run netcat listeners (replaced by ```modules/nc.js```) -- this greatly reduces the complexity of Brosec and makes it easier to install.


- Bug fixes
  - Lots and lots of bug fixes...and probably new bugs introduced ;p

## 1.0.2b _(Feb 16, 2016)_

- Features
    - `bros update`
        - Convenience module that check for updates via git, pull if any updates are found, and installs any new dependencies.


## 1.0.2a _(Feb 15, 2016)_

- Features
    - `bros clean`
        - New feature added to allow quick deletion of the local Brosec database.

- Minor performance improvements throughout Brosec

## 1.0.2 _(Feb 5, 2016)_

- Features
    - `bros ftp`
        - New feature added to allow for a simple (insecure) ftp server which allows download/upload of the current directory via anonymous connections.

    - `bros set lhost`
    	- This feature (ran from the command line) will help you set the LHOST variable by prompting you with the available list of network interfaces.

- Dependencies
    - ftpd (nodejs module)
        - Required for the `bros ftp` feature


## 0.1a _(August 15, 2015)_

- Dependencies
    - Clipboard
        - Swapped out xclip for xsel, which seems to work better. Linux users will need to install xsel for clipboard support.
        - Updated README to reflect this change.
- Features
    - `bros http <port (default 8000)>`
        - New feature added to allow for a simple web server similar to running `python -m SimpleHTTPServer`. SSL supprt is included via `bros https`
