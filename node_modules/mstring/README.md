# mstring

## Multi-line Strings Module for Node.js

This is a simple little module that lets you have multi-line strings in JavaScript.

Just do this:

```JavaScript
var M = require('mstring')

var mystring = M(function(){
  /***
  Ontario
  Mining and
  Forestry
  Group
  ***/})
```

to get


```JavaScript
mystring == "Ontario\nMining and\nForestry\nGroup"
```

And that's pretty much it.

## Install

```sh
npm install mstring
```

## Format

An empty anonymous function, containing a single multi-line comment
block. The comment block should start and end with <code>/***</code>
and <code>***/</code>. The first and last newlines of the comment are ignored, as is any indentation.


## How it Works

In Node.js, you can call the <code>.toString</code> method of a
function, and it will give you the source code of the function
definition, including any comments. A regular expression grabs the
content of the comment. 

Yes, it's a hack. Inspired by a throwaway comment from [Dominic Tarr](http://dominictarr.com/).



