Brosec
======

Overview
=========

- Brosec is a terminal based utility to help Security Bros utilize complex but useful payloads and commands.
- Brosec stores your configuration in a local db (by default is stored in /var/tmp) for your convenience, and outputs payloads to the clipboard
- Your current config can be accessed by the config command at any time
- Config values can be changed at any time by entering set <option> <value>
- You can access frequent payloads by entering the menu option sequence via the commandline


Installation
============

- git clone https://github.com/gabemarshall/Brosec.git
- cd into the directory and run `npm install`
- create a symlink to /usr/bin (Optional)
- Linux users will need to install xclip
- Mac users may need to install netcat (via homebrew) for some payloads



Usage
=====

`$ bros`

`# bros 121` (Access a frequently used payload by entering the menu sequence)


Options
=======

- LHOST : Local IP or name
- LPORT : Local IP or name
- RHOST : Remote IP or name
- RPORT : Remote IP or name
- USER : Username (only used in a few payloads)