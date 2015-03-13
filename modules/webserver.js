var express = require('express')
var app = express()
var morgan = require('morgan')
var db = require('../db/db');
var log = require('cli-color');
var blue = log.cyan
var black = log.blackBright

app.use(morgan('combined'))

app.get('/', function (req, res) {
  res.send('Come at me bro!')
})

exports.init = function(callback, a1){
	callback(a1)
	
	var port = db.getConfig("LPORT")
	var server = app.listen(port, function () {

	  console.log('\n'+black('[*]')+' A web server is running on port %s (ctrl c to stop)', port)

	})

}


