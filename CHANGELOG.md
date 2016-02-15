# ChangeLog

## 0.2a _(Feb 15, 2016)_

- Features
    - `bros clean`
        - New feature added to allow quick deletion of the local Brosec database.

- Minor performance improvements throughout Brosec

## 0.2 _(Feb 5, 2016)_

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
