Brosec
======
Security, for Bros.

Overview
=========

- Brosec is a reference utility to help Security Bros with useful payloads and commands
- Brosec utilizes saved configuration variables (set at any time by you) to create custom payloads on the fly. These variables persist in a local database for your convenience
- Brosec outputs payloads and copies them to your clipboard in order to make your pentesting even more magical
- Your configuration variables can be accessed by the `config` command at any time, or by entering the variable name
- Config values can be changed at any time by entering `set <variable> <value>`
- You can navigate to frequently used payloads by entering the menu sequence from the command line: `bros <sequence>`
  - Ex: `bros 412` - This would automate entering 4 for the Web Menu, 1 for the XXE sub menu, and 3 for the XXE local file read payload


Installation
============

- git clone https://github.com/gabemarshall/Brosec.git
- cd into the directory and run `npm install`
- Linux users will need to install xclip
- Mac users may need to install netcat (via homebrew) for some payloads



Payload Variables
=================

- LHOST : Local IP or name
- LPORT : Local IP or name
- RHOST : Remote IP or name
- RPORT : Remote IP or name
- USER : Username (only used in a few payloads)
- PROMPT : User Prompt (This isn't a stored value. Instead, payloads with this variable will prompt for input.)


Command Line Usage
==================

`$ bros`

`$ bros 121` (Example to access a frequently used payload via the payload's menu sequence)