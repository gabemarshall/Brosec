var express = require('express')
var app = express()
var morgan = require('morgan')
var question = require('./questions.js')
var db = require('../db/db');
var log = require('cli-color');
var blue = log.blue
var black = log.blackBright

app.use(morgan('combined'))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

exports.init = function(callback){
	callback()
	
	var port = db.getConfig("LPORT")
	var server = app.listen(port, function () {

	  var host = server.address().address

	  console.log('\n'+black('[*]')+' A web server is running at http://%s:%s (ctrl c to stop)', host, port)

	})

}


