# ChangeLog

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
